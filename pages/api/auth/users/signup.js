import { connectToDatabase } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/auth";

const signUpHandler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { username, password } = req.body;
  if (
    !username ||
    username.trim() === "" ||
    username.trim().length < 3 ||
    !password ||
    password.trim() === "" ||
    password.trim().length < 8
  ) {
    res.status(422).json({ message: "Incomplete Credentials" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db("sharelist");
  const users = db.collection("user");
  const existingUser = await users.findOne({ username: username });
  if (existingUser) {
    res.status(422).json({ message: "User already exists" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await users.insertOne({
    username: username,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User Created" });
  console.log(result);
  client.close();
};

export default signUpHandler;
