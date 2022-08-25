import { connectToDatabase } from "../../../../lib/db";

export const getAllMyLists = async (username) => {
  const client = await connectToDatabase();
  const db = client.db("sharelist");
  const allLists = db.collection("list");
  const allMyLists = await allLists
    .find({
      creator_id: username,
    })
    .toArray();
  const allSharedLists = await allLists
    .find({
      shared_id: username,
    })
    .toArray();
  client.close();
  return [...allMyLists, ...allSharedLists];
};
