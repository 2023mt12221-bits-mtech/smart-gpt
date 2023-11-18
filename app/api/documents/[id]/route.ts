// Import the generated Prisma client

import { NextRequest, NextResponse } from "next/server"
import { initPinecone } from "@/utils/pinecone-client"
import { PrismaClient } from "@prisma/client"

import { createPrisma } from "@/lib/prisma"
import { supabaseClient } from "@/lib/supabase"
import { QueryOperationRequest } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch"

// @ts-ignore
export async function GET(request: NextRequest, { params: { id } }) {
  // Get credentials from cookies
  const credentials = JSON.parse(
    request.cookies.get("credentials")?.value || null
  )
  if (!credentials) {
    return NextResponse.redirect("/credentials")
  }
  // refactor this
  const { supabaseDatabaseUrl } = credentials
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: supabaseDatabaseUrl,
      },
    },
  })
  const data = await prisma.documents.findFirst({
    where: {
      id,
    },
  })

  return NextResponse.json({ data })
}

// delete document and pinecone namespace for document. namespace is the same as the document id
// @ts-ignore
export async function DELETE(request: NextRequest, { params: { id } }) {
  // Get credentials from cookies
  const credentials = JSON.parse(
    request.cookies.get("credentials")?.value || null
  )
  if (!credentials) {
    return NextResponse.redirect("/credentials")
  }

  const {
    supabaseDatabaseUrl,
    pineconeEnvironment,
    pineconeApiKey,
    pineconeIndex,
    supabaseUrl,
    supabaseKey,
    supabaseBucket,
  } = credentials
  const prisma = createPrisma({ url: supabaseDatabaseUrl })
  const pinecone = await initPinecone(pineconeEnvironment, pineconeApiKey);

  const document = await prisma.documents.delete({
    where: {
      id,
    },
  })

  // fetch all vector IDs from pinecode using source metadata and delete pinecone vectors 
  const index = pinecone.Index(pineconeIndex)
  let vectorIDs = [];

  let queryVector = [];
  for (let i=0; i<1536; i++) {
    queryVector.push(0.1);
  }

  const queryOpReq: QueryOperationRequest = {
    queryRequest: {
      topK: 10000,
      filter: { source: `./tmp/${id}.pdf` },
      vector: queryVector,
      includeMetadata: true,
      includeValues: true
   }
  };

  const vectors: any = await index.query(queryOpReq);

  vectors.matches.forEach((vector) => {
    vectorIDs.push(vector.id);
  });

  vectorIDs.forEach(async (vectorId) => {
    let deleteFilter: any = {id: vectorId};
    await index._delete(deleteFilter);
  });

  // delete supabase storage file
  const supabase = supabaseClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.storage
    .from(supabaseBucket)
    .remove([document.url])

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
  return NextResponse.json({ message: "Document deleted" })
}


// TODO : Pass supabase ID in filter metadata to delete from pinecone