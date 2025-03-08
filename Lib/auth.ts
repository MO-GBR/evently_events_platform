import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { connectToDatabase } from "./Database";
import User from "./Database/Models/UserModel";
import { compare } from "bcryptjs";
import { handleError, ActionResponse } from "./Utils/responseHandle";
import { v4 as uuidv4 } from 'uuid';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Write your email here"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Write your password here"
        }
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if(!email || !password) throw new CredentialsSignin("Please provide both email & password");

        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password");

        if(!user || !user.password) throw new CredentialsSignin("Invalid email or password");

        const isMatched = await compare(password, user.password);

        if(!isMatched) throw new CredentialsSignin("Your passwords doesn't match");

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          photo: user.photo,
          id: user._id
        };

        return userData;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token }) {
      if(token?.sub) {
        session.user.id = token.sub
      };

      return session;
    },

    async jwt({ token, user }) {
      return token;
    },

    signIn: async ({ user, account }) => {
      if(account?.provider === "google") {
        try {
          const { email, image, name, id } = user;

          await connectToDatabase();

          const existingUser = await User.findOne({email});

          const tail = uuidv4();

          const username = `${name?.split(" ").join("").toLowerCase()}${tail}`;

          if(!existingUser) {
            const newUser = await User.create({
              firstName: name,
              username,
              email,
              photo: image,
              authProviderId: id,
            });
            const data = new ActionResponse(200, newUser);
            console.log(data);
          } else {
            return true;
          }
        } catch (error) {
          handleError(error);
        }
      }

      if(account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    }
  }
});