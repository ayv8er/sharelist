import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const db = client.db("sharelist");
        const usersList = db.collection("users");
        const user = await usersList.findOne({
          username: credentials.username,
        });
        if (!user) {
          client.close();
          throw new error("Invalid credentials");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new error("Invalid credentials");
        }
        client.close();
        return {
          req,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
