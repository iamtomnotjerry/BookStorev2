import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import User from "@/app/models/user";
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

    // Assuming pdfFile is a File
    const pdfFile: File | null = formData.get('pdfFile');

    if (!pdfFile) {
      return NextResponse.json({ message: 'PDF file not provided' }, { status: 400 });
    }

    // Read the content of the File as ArrayBuffer
    const pdfContent: ArrayBuffer = await pdfFile.arrayBuffer();

    // Convert the ArrayBuffer to a Buffer
    const pdfBuffer = Buffer.from(pdfContent);

    console.log(pdfBuffer);
    console.log({ title, author, imageUrl, userEmail, pdfFile });

    await connectMongoDB();

    // Create the book
    const book = await Book.create({
      title,
      author,
      imageUrl,
      userEmail,
      pdfFile: pdfBuffer,
    });

    console.log(book);

    // Update the user's books array
    await User.findOneAndUpdate({ email: userEmail }, { $push: { books: book._id } });

    return NextResponse.json({ message: 'Sell successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during selling:', error);
    return NextResponse.json(
      { message: 'An error occurred while selling.' },
      { status: 500 }
    );
  }
}
