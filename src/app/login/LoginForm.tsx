"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";
import { buttonClasses } from "@/components/ui/button-styles";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Usuário</label>
        <input
          name="username"
          required
          autoFocus
          autoComplete="username"
          className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Senha</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md", "w-full")}>
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
