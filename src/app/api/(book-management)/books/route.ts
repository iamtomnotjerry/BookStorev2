import { connectMongoDB } from "@/app/lib/mongodb-connection-module";
import Book from "@/app/models/book";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await connectMongoDB();
    const books = await Book.find({});
    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
