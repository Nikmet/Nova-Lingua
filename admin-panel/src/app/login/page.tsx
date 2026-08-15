import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/login-form";
import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-6 py-16">
      <LoginForm />
    </div>
  );
}
