import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import { MongoClient, Binary } from 'mongodb';

export async function POST(req: any) {
  try {
    const formData = await req.formData();
    const pdfFile: File | null = formData.get('pdfFile');

    if (!pdfFile) {
      return NextResponse.json({ message: 'PDF file not provided' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();
    
    // Read the content of the PDF file as ArrayBuffer
    const pdfContent: ArrayBuffer = await pdfFile.arrayBuffer();

    // Convert the ArrayBuffer to a Buffer
    const pdfBuffer = Buffer.from(pdfContent);

    // Create a MongoClient
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
    // Handle the case where MONGODB_URI is not defined
    console.error('MONGODB_URI is not defined');
    return NextResponse.json({ message: 'Failed to store PDF file' }, { status: 500 });
    }

    const client = new MongoClient(mongoUri);

    try {
      // Connect to the MongoDB server
      await client.connect();

      // Access the 'pdf' collection
      const pdfCollection = client.db().collection('pdf');

      // Insert the PDF content into the 'pdf' collection
      const result = await pdfCollection.insertOne({ content: new Binary(pdfBuffer) });
      


      return NextResponse.json({ message: 'PDF file stored successfully', _id: result.insertedId }, { status: 201 });

      
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  } catch (error) {
    console.error('Error storing PDF file:', error);
    return NextResponse.json({ message: 'An error occurred while storing the PDF file' }, { status: 500 });
  }
}
