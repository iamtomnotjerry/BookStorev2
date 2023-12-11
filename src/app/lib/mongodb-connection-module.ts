import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const uri = process.env.MONGODB_URI ?? ''; // Use empty string as a default if MONGODB_URI is undefined
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
};
