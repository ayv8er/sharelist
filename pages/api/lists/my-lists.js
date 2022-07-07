import { MongoClient } from "mongodb";

export const getAllMyLists = async (userPhoneNumber) => {
  const client = await MongoClient.connect(
    `mongodb+srv://richardoh86:${process.env.NEXT_MONGODB_PASSWORD}@cluster0.0odgf.mongodb.net/sharelist?retryWrites=true&w=majority`
  );
  const db = client.db("sharelist");
  const usersList = db.collection("list");
  const allLists = await usersList
    .find({
      creator_id: userPhoneNumber.userId,
    })
    .toArray();
  client.close();
  return allLists;
};
