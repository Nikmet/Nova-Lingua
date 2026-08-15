"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type LoginState = { error: string | null };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
    return { error: null };
  } catch (error) {
    // signIn бросает NEXT_REDIRECT при успехе — его пробрасываем дальше.
    if (error instanceof AuthError) {
      return { error: "Неверная почта или пароль" };
    }
    throw error;
  }
}
