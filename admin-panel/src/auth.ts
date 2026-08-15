import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { authConfig } from "@/auth.config";
import { db } from "@/lib/db";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Почта", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const administrator = await db.administrator.findUnique({
          where: { email },
        });
        if (!administrator) return null;

        const passwordMatches = await compare(password, administrator.passwordHash);
        if (!passwordMatches) return null;

        return {
          id: administrator.id,
          name: administrator.name,
          email: administrator.email,
        };
      },
    }),
  ],
});
