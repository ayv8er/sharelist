import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        console.log(req);
        const client = await connectToDatabase();
        const db = client.db("sharelist");
        const users = db.collection("user");
        let user = await users.findOne({
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
        user = {
          ...user,
          name: user.username,
        };
        client.close();
        return {
          name: user.username,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
