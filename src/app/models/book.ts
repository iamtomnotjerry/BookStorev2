// models/book.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  stock: number;
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
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const BookModel = mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', bookSchema);

export default BookModel;
