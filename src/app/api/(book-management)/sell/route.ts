import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import User from "@/app/models/user";
import Book from "@/app/models/book";


export async function POST(req:any) {
  try {
    const { title, author, price, imageUrl, userEmail } = await req.json();
    console.log({ title, author, price, imageUrl, userEmail })
    await connectMongoDB();
    console.log(1)
    // Create the book
    const book = await Book.create({
        title,
        author,
        price,
        imageUrl,
        userEmail
      });
    console.log(book)
    // Update the user's books array
    await User.findOneAndUpdate({email:userEmail}, { $push: { books: book._id } });

    return NextResponse.json({ message: 'Sell successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during selling:', error);
    return NextResponse.json(
      { message: 'An error occurred while selling.' },
      { status: 500 }
    );
  }
}
