import mongoose from 'mongoose';
import { handleError } from '../Utils/responseHandle';

const MONGO_DB_URI = process.env.MONGO_DB_URI!;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    if (cached.conn) return cached.conn;
    if(!MONGO_DB_URI) throw new Error('MONGODB_URI is missing');
    cached.promise = cached.promise || mongoose.connect(MONGO_DB_URI, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
      }
    });

    cached.conn = await cached.promise;

    console.log("connected to mongo DB");

    return cached.conn;
  } catch (error) {
    handleError(error);
  }
};