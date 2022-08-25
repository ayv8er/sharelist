import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../lib/db";

export default async function updateListItems(req, res) {
  if (req.method === "POST") {
    const { item, list_id } = req.body;
    const addedItem = {};
    if (item.price === "") {
      addedItem[item.name] = "0";
    } else {
      addedItem[item.name] = item.price;
    }
    const client = await connectToDatabase();
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const oldList = await usersList.findOne({ _id: ObjectID(list_id) });
    const result = await usersList.updateOne(
      { _id: ObjectID(list_id) },
      {
        $set: {
          list_items: [addedItem, ...oldList.list_items],
        },
      }
    );
    client.close();
    res.json(result);
  }
  if (req.method === "DELETE") {
    const { id, newList } = req.body;
    const client = await connectToDatabase();
    const db = client.db("sharelist");
    const usersList = db.collection("list");
    const result = await usersList.updateOne(
      { _id: ObjectID(id) },
      {
        $set: {
          list_items: [...newList],
        },
      }
    );
    client.close();
    res.json(result);
  }
}
