// models/book.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  imageUrl: string;
  userEmail: string;
  pdfFile: Buffer;
}

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String, 
    required: true,
  },
  pdfFile: {
    type: Buffer,  // Use Buffer for binary data
    required: true,
  },
  
  
  
}, { timestamps: true });

const BookModel = mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', bookSchema);

export default BookModel;
