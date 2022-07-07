import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function updateList(req, res) {
  if (req.method === "POST") {
    const { item, listId } = req.body;
    const addedItem = {};
    addedItem[item.name] = Number(item.price);
    const client = await MongoClient.connect(
      `mongodb+srv://richardoh86:${process.env.NEXT_MONGODB_PASSWORD}@cluster0.0odgf.mongodb.net/sharelist?retryWrites=true&w=majority`
    );
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const oldList = await usersList.findOne({ _id: ObjectID(listId) });
    const result = await usersList.updateOne(
      { _id: ObjectID(listId) },
      {
        $set: {
          list_items: [addedItem, ...oldList.list_items],
        },
      }
    );
    client.close();
    res.json(202);
  }
}
