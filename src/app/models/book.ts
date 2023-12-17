import mongoose, { Schema, Document } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  imageUrl: string;
  userEmail: string;
  pdfId: mongoose.Types.ObjectId;
}

const bookSchema = new Schema<Book>(
  {
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
    pdfId: {
      type: Schema.Types.ObjectId, // Explicitly specify the type
      required: true,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', bookSchema);

export default BookModel;
