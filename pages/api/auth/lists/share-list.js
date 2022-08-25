import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../lib/db";

export default async function updateShared(req, res) {
  const { id, username } = req.body;
  if (req.method === "POST") {
    const client = await connectToDatabase();
    const db = client.db("sharelist");
    const users = db.collection("user");
    const lists = db.collection("list");
    const existingUser = await users.findOne({ username: username });
    if (!existingUser) {
      client.close();
      res.json({ status: 404, message: "Username does not exist" });
    } else {
      const theList = await lists.findOne({ _id: ObjectID(id) });
      const result = await lists.updateOne(
        { _id: ObjectID(id) },
        {
          $set: {
            shared_id: [...theList.shared_id, username],
          },
        }
      );
      client.close();
      res.json(result);
    }
  }
}
