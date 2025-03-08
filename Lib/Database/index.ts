import mongoose from 'mongoose';
import { handleError } from '../Utils/responseHandle';

const MONGO_DB_URI = process.env.MONGO_DB_URI!;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
      }
    });
    console.log("connected to mongo")
  } catch (error) {
    handleError(error);
    // process.exit(1);
  }
};