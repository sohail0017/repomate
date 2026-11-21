import "dotenv/config";
import { MongoClient } from "mongodb";

let clientPromise;

export async function getMongoCollection() {
  const uri = process.env.MONGODB_URI?.trim();
  const databaseName = process.env.MONGODB_DATABASE?.trim();

  if (!uri) {
    throw new Error("MONGODB_URI must be set in the backend environment");
  }
  if (!databaseName) {
    throw new Error("MONGODB_DATABASE must be set in the backend environment");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client
      .connect()
      .then(() => {
        console.log("MongoDB connected successfully");
        return client;
      })
      .catch((error) => {
        clientPromise = undefined;
        throw error;
      });
  }

  const client = await clientPromise;
  const database = client.db(databaseName);
  return database.collection("file_embeddings");
}