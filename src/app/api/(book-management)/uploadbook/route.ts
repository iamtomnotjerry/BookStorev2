import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import Book from "@/app/models/book";

export async function POST(req: any) {
  try {
    // Get form data once
    const formData = await req.formData();

    // Extract values from form data
    const title: string = formData.get('title');
    const author: string = formData.get('author');
    const imageUrl: string = formData.get('imageUrl');
    const userEmail: string = formData.get('userEmail');
    const pdfId = formData.get('pdfId'); // Retrieve the PDF identifier from the form data


    await connectMongoDB();

    // Create the book
    const book = await Book.create({
      title,
      author,
      imageUrl,
      userEmail,
      pdfId,
    });
    return NextResponse.json({ message: 'Sell successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during selling:', error);
    return NextResponse.json(
      { message: 'An error occurred while selling.' },
      { status: 500 }
    );
  }
}
