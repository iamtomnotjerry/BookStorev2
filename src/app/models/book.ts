// models/book.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  userEmail: string;
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
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
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
  stock: {
    type: Number,
    required: false,
  },
  
}, { timestamps: true });

const BookModel = mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', bookSchema);

export default BookModel;
