import { connectMongoDB } from "@/app/lib/mongodb-connection-module";
import Book from "@/app/models/book";
import { NextResponse } from "next/server";
const { parse } = require('url');

export async function GET(req: any) {
  try {
    await connectMongoDB();
    const url = req.url;
    const parsedUrl = parse(url, true);
    const userEmail = parsedUrl.query.email;

    // Query the database for books with the specified user email
    const books = await Book.find({ userEmail });

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
