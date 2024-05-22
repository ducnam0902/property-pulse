import GoogleProvider from "next-auth/providers/google";
import connectDB from "./../config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      return true;
    },
    //Modify the session object
    async session({ session }) {
      // 1.Get user from Database
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
      // 2. Assign the user id to the session
      // 3. return session
    },
  },
};
