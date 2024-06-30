import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/utils/mongoodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { NextApiHandler } from 'next';
import { signOut } from 'next-auth/react';

// Define the user type for the authorize function
interface UserType {
  id: string;
  email: string;
  name: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (user && bcrypt.compareSync(credentials?.password || '', user.password)) {
          return { id: user._id.toString(), email: user.email, name: user.username } as UserType;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          //id: token.id as string,
          name: token.name,
        };
      }
      return session;
    },
  },
};

// Create the handler
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// Export the handlers
export { authHandler as GET, authHandler as POST };









