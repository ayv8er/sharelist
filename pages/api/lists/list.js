import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function updateList(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://richardoh86:${process.env.NEXT_MONGODB_PASSWORD}@cluster0.0odgf.mongodb.net/sharelist?retryWrites=true&w=majority`
    );
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const result = await usersList.insertOne(req.body);
    client.close();
    res.json(result);
  }
  if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      `mongodb+srv://richardoh86:${process.env.NEXT_MONGODB_PASSWORD}@cluster0.0odgf.mongodb.net/sharelist?retryWrites=true&w=majority`
    );
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const result = await usersList.deleteOne({ _id: ObjectID(req.body.id) });
    client.close();
    res.json(result);
  }
}
