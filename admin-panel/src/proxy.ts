import NextAuth from "next-auth";

import authConfig from "@/auth.config";

// `middleware.ts` в Next 16 переименован в `proxy.ts`; функциональность та же.
// Здесь только edge-безопасный конфиг (без Prisma) — проверка сессии по JWT.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Всё, кроме статики, роутов авторизации и публичного приёма Заявок с лендинга.
  matcher: ["/((?!api/auth|api/applications|login|_next/static|_next/image|favicon.ico).*)"],
};
