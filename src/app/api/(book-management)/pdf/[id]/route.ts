const { parse } = require('url');
const { MongoClient } = require('mongodb');
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = 'mongodb+srv://23560004:23560004@cluster0.nleb44z.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB connection string
const dbName = 'bookstore';
const collectionName = 'pdf';

async function fetchPDFContent(pdfId:any) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const objectId = new ObjectId(pdfId);
      // Assuming you want to fetch the most recently inserted PDF
      const pdfData = await collection.findOne({_id:objectId});
      if (pdfData && pdfData.content) {
        return pdfData.content.buffer;  
      }
      return null;
    } finally {
      await client.close();
      console.log('Connection closed');
    }
  }
  
export async function GET(req: any) {
    const { pathname, query } = parse(req.url, true); // Parse the URL
    // Extract the id from the pathname
    const pdfId = pathname.split('/').pop();
    try {
        const pdfContent = await fetchPDFContent(pdfId);
        return NextResponse.json({pdfContent})
    } catch {
    }
}