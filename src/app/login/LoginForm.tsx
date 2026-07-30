"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

function FieldIcon({ d }: { d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="text-white/40 shrink-0"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const inputWrap =
  "flex items-center gap-3 border-b border-white/15 pb-2 transition-colors focus-within:border-mint/70";
const inputClass =
  "w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div className={inputWrap}>
        <FieldIcon d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 9h6M9 13h6M9 17h6" />
        <input
          name="organizacao"
          required
          autoFocus
          autoCapitalize="none"
          aria-label="Organização"
          placeholder="sua organização"
          className={inputClass}
        />
      </div>

      <div className={inputWrap}>
        <FieldIcon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
        <input
          name="username"
          required
          autoComplete="username"
          aria-label="Usuário"
          placeholder="usuário"
          className={inputClass}
        />
      </div>

      <div className={inputWrap}>
        <FieldIcon d="M6 10V7a6 6 0 1 1 12 0v3M5 10h14v10H5z" />
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-label="Senha"
          placeholder="senha"
          className={inputClass}
        />
      </div>

      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-teal to-mint text-navy-deep font-semibold text-sm py-2.5 mt-2 transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
