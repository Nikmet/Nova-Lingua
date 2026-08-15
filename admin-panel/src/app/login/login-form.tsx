"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-heading">Вход в админку</CardTitle>
        <CardDescription>Nova Lingua</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Почта</FieldLabel>
              <Input id="email" name="email" type="email" autoComplete="username" required />
            </Field>
            <Field data-invalid={state.error ? true : undefined}>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                aria-invalid={state.error ? true : undefined}
                aria-describedby={state.error ? "login-error" : undefined}
              />
              {state.error && <FieldError id="login-error">{state.error}</FieldError>}
            </Field>
            <Button type="submit" disabled={pending}>
              {pending ? "Входим…" : "Войти"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
