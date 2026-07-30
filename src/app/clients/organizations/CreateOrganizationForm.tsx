"use client";

import { useActionState, useRef, useEffect } from "react";
import { createOrganization, type CreateOrgState } from "@/lib/actions/organizations";
import { buttonClasses } from "@/components/ui/button-styles";

export default function CreateOrganizationForm() {
  const [state, formAction, pending] = useActionState<CreateOrgState, FormData>(
    createOrganization,
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
        <label className="block text-sm font-medium text-navy mb-1">Nome da organização</label>
        <input
          name="name"
          required
          className="rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Usuário principal</label>
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
        {pending ? "Criando..." : "Criar organização"}
      </button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="w-full text-sm text-green-600">Organização criada.</p>}
    </form>
  );
}
