import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://richardoh86:${process.env.NEXT_MONGODB_PASSWORD}@cluster0.0odgf.mongodb.net/?retryWrites=true&w=majority`
  );
  return client;
};
