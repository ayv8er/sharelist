import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../lib/db";

export default async function updateList(req, res) {
  if (req.method === "POST") {
    const client = await connectToDatabase();
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const result = await usersList.insertOne(req.body);
    client.close();
    res.json(result);
  }
  if (req.method === "DELETE") {
    const client = await connectToDatabase();
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const result = await usersList.deleteOne({ _id: ObjectID(req.body.id) });
    client.close();
    res.json(result);
  }
}
