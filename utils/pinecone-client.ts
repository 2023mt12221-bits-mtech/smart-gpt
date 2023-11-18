import { PineconeClient } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

export async function initPinecone(environment: string, apiKey: string) {
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment,
      apiKey
    });

    return pinecone;
  } catch (error) {
    console.error('Error : ', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}


