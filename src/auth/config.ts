import bcryptjs from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth',
    newUser: '/auth'
  },
  providers: [
    CredentialsProvider({
      id: 'local-credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@domain.com' },
        password: { label: 'Password', type: 'password', placeholder: '●●●●●●●●' }
      },
      
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user || !bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...rest } = user
        return rest
      }
    })
  ],
})