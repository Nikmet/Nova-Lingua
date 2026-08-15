import type { NextAuthConfig } from "next-auth";

/**
 * Edge-безопасная часть конфига: без Prisma и bcrypt, чтобы её мог импортировать
 * `proxy.ts`. Провайдеры и работа с базой — в `src/auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    // Credentials-провайдер работает только с JWT-сессиями; таблицы сессий нет.
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    /** Единственное правило доступа: залогинен — значит можно всё (ролей нет). */
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
