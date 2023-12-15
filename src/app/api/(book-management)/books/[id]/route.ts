// pages/api/book/[id].ts
import { connectMongoDB } from "@/app/lib/mongodb-connection-module";
import Book from "@/app/models/book";
import { NextResponse } from "next/server";
const { parse } = require('url');
export async function GET(req: any) {
  try {
    const { pathname, query } = parse(req.url, true); // Parse the URL
    // Extract the id from the pathname
    const id = pathname.split('/').pop();
    await connectMongoDB();
    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ book }, { status: 200 });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
