
# SMART-GPT

## Introduction

SMART-GPT is an innovative project that harnesses the power of the [LangChain framework](https://js.langchain.com/docs/), a transformative tool for developing applications powered by language models. This unique application uses LangChain to offer a chat interface that communicates with PDF documents, driven by the capabilities of [OpenAI's language models](https://platform.openai.com/docs/introduction).

In this project, the language model is connected to other data sources and allows interaction with its environment, thus embodying the principles of the LangChain framework. Users can upload a PDF document, which is then processed and saved in [Pinecone](https://www.pinecone.io/), a vector database, and [Supabase storage](https://supabase.com/). Users can then chat with the uploaded PDF, with the AI utilizing the content of the document to engage in a meaningful conversation.

The project relies on the [Next.js](https://nextjs.org/) framework, a leading choice for creating robust, full-stack Web applications. The UI components are beautifully crafted using the [Radix UI library](https://www.radix-ui.com/) and styled with Tailwind CSS, based on the elegant template provided by [shadcn/ui](https://github.com/shadcn/ui).

## Features

1.  **Upload a PDF**: Users can upload a PDF document, which is then stored in Pinecone vector database and Supabase storage.
2.  **Chat with PDF**: The application processes the content of the PDF and allows users to engage in a conversation with the document using OpenAI API.
3.  **PDF Preview**: Users can preview the actual PDF document they are interacting with, using the powerful React component package, [@react-pdf-viewer](https://react-pdf-viewer.dev/).
4.  **List PDFs**: The application provides a list of all uploaded PDF documents stored in the Supabase database.
5.  **Delete a PDF**: Users have the ability to remove a document from the database.
6.  **Cite Sources**: The AI chat interface provides sources from the PDF for every reply, allowing users to navigate directly to the reference in the PDF.

## Usage Examples

SMART-GPT is equipped with examples that illustrate various operations such as:

1.  Interacting with Pinecone: saving embeddings, deleting a record.
2.  Uploading a file to Supabase storage and also deleting a file.
3.  Listing available documents from Supabase database.
4.  Previewing a PDF using the @react-pdf-viewer.
5.  Navigating directly to the source of an AI reply in the PDF.

## Quick Testing Using the Demo

To test the functionality of this project using the demo, you will need to provide your own credentials for OpenAI, Supabase, and Pinecone. For Supabase, you can follow the step-by-step guide provided below to setup and retrieve the necessary credentials. For acquiring credentials for OpenAI and Pinecone, please consult the corresponding documentation as a step-by-step guide may not be available. Always ensure you are following the latest instructions provided by the respective services.

### 1. OpenAI
[OpenAI](https://platform.openai.com/docs/guides/authentication)

### 2. Supabase
1.  **Creating a New Project in Supabase**:
    
    -   Open your web browser and navigate to [app.supabase.io](https://app.supabase.io/).
    -   Click on "New project".
    -   Enter your project details and wait for the new PostgreSQL database to launch. It may take a few minutes for the process to complete.
2.  **Retrieving the Database Connection URL**:
    
    -   Once your database is successfully created, navigate to your project's page.
    -   Go to the "Settings" section.
    -   Click the "Database" tab in the sidebar.
    -   Scroll down to the bottom of the page and look for the "Connection string" section.
    -   Choose "Nodejs" and copy the URL.

This connection string will be used for the `DATABASE_URL` environment variable in your application.

3.  **Retrieving the Connection Pooling Connection String**:
    -   Still in the "Database" tab of the "Settings" section, scroll to find the "Connection Pooling" section.
    -   Choose "Nodejs" and copy the Connection Pooling URL.

This URL will be used for the `DIRECT_URL` environment variable in your application.

4.  **Retrieving Storage Keys**:
    -   From your project's page, go to the "Settings" section.
    -   Click the "API" tab in the sidebar.
    -   Here, you will find your `SUPABASE_URL` and `SUPABASE_KEY`. Copy these values.

The `SUPABASE_URL` is the URL for your project, while `SUPABASE_KEY` is the public anonymous key for your project.

5.  **Setting up the Supabase Bucket**:
    
    -   From your project's page, go to the "Storage" section.
    -   Here, create a new bucket or use an existing one. The name of the bucket will be used as `SUPABASE_BUCKET` in your application.
6.  **Setting Up Environment Variables in Your Application**:
    
    -   Now, navigate to your project where you are using Supabase.
    -   Add the following environment variables with the values you copied from the Supabase console:
        -   `DATABASE_URL`
        -   `DIRECT_URL`
        -   `SUPABASE_KEY`
        -   `SUPABASE_URL`
        -   `SUPABASE_BUCKET`

These keys will allow your application to interact with the Supabase services.

7.  **Managing Storage Bucket Policies**:
    -   Navigate to the "Storage" section from your project's page.
    -   Click on the bucket for which you want to manage policies.
    -   Click on the "Policies" tab to view the existing policies for the bucket.
    -   To create a new policy, click the "Create policy" button and fill in the policy details as per your requirement.
    -   To edit an existing policy, click on the policy in the list and make the necessary changes.

Please note that while it's possible to set a policy that makes your storage bucket publicly accessible, you should do this with caution. Making your bucket publicly accessible means that anyone with the URL to an object can access it. This might be useful for testing, but for production applications, you should consider more restrictive policies to ensure the security of your data. Always consult the Supabase documentation or a security expert to understand the implications of different policies.

With this, you should be able to set up Supabase for your project and manage storage policies as per your requirements.

### 3. Pincone
[Pinecone](https://www.pinecone.io/docs/)

## Setup and Installation

To set up and run SMART-GPT on your local machine, follow the steps below:

1.  Unzip The Project     
    
2.  Navigate into the project directory and install the dependencies using [npm](https://npm.io/):
    
    ```
    cd smart-gpt
    npm install
    ```
    
3.  Create a `.env` file in the root directory and fill in your credentials (OpenAI, Pinecone, Supabase) as indicated in the `.env.example` file.

4. Create the database schema using Prisma. You must make you have run the prisma generate command `prisma generate`
    
    ```
    npx prisma migrate dev --name init
    ```

5.  Start the server:
  
    ```
    npm run dev
    ```


## DEMO VIDEO

### https://drive.google.com/file/d/16e2oaV_YxCAm6-nTNOlY87UZt5RQBwSn/view?usp=sharing