import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const mongoUri = process.env.MONGO_URI!;
if (!mongoUri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

const client = new MongoClient(mongoUri);
const clientPromise = client.connect();

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(mongoUri);
  connection.isConnected = db.connections[0].readyState;
}

const adapter = MongoDBAdapter(clientPromise);

export { clientPromise, dbConnect, adapter };
