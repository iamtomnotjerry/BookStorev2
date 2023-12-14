import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import User from "@/app/models/user";
import Book from "@/app/models/book";
import multer from 'multer';

// Set up multer to handle file uploads
const upload = multer();

export async function POST(req: any) {
  try {
    // Call the multer middleware to handle file upload
    await new Promise((resolve) => {
      upload.single('pdfFile')(req, {} as any, async (err: any) => {
        if (err) {
          console.error('Error during file upload:', err);
          resolve(
            NextResponse.json({ message: 'Error uploading file.' }, { status: 500 })
          );
          return;
        }

        try {
          // Parse the JSON from the request body
          const { title, author, imageUrl, userEmail } = await req.json();

          await connectMongoDB();

          // Check if a file is attached to the request
          if (!req.file) {
            resolve(
              NextResponse.json(
                { message: 'PDF file is required for uploading.' },
                { status: 400 }
              )
            );
            return;
          }

          const pdfFileBuffer = req.file.buffer; // Access the file buffer

          // Create the book with the PDF file
          const book = await Book.create({
            title,
            author,
            imageUrl,
            userEmail,
            pdfFile: pdfFileBuffer, // Store the PDF file in the database
          });

          // Update the user's books array
          await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { books: book._id } }
          );

          resolve(NextResponse.json({ message: 'Sell successfully' }, { status: 201 }));
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          resolve(
            NextResponse.json(
              { message: 'Invalid JSON format in the request body.' },
              { status: 400 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error('Error during selling:', error);

    // Check if the error is related to JSON parsing
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: 'Invalid JSON format in the request body.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'An error occurred while selling.' },
      { status: 500 }
    );
  }
}