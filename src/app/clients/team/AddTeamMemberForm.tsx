"use client";

import { useActionState, useRef, useEffect } from "react";
import { addTeamMember, type AddTeamMemberState } from "@/lib/actions/team";
import { buttonClasses } from "@/components/ui/button-styles";

export default function AddTeamMemberForm() {
  const [state, formAction, pending] = useActionState<AddTeamMemberState, FormData>(
    addTeamMember,
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Usuário</label>
        <input
          name="username"
          required
          autoCapitalize="none"
          className="rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Senha</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md")}>
        {pending ? "Adicionando..." : "Adicionar usuário"}
      </button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="w-full text-sm text-green-600">Usuário adicionado.</p>}
    </form>
  );
}
