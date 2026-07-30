"use client";

import { useActionState, useState } from "react";
import { updateAppearance, type UpdateAppearanceState } from "@/lib/actions/appearance";
import { buttonClasses } from "@/components/ui/button-styles";

type Fields = {
  corDestaque: string;
  corSidebar: string;
  corTexto: string;
  corFundo: string;
};

const LABELS: Record<keyof Fields, string> = {
  corDestaque: "Cor de destaque (botões, ícones)",
  corSidebar: "Cor da barra lateral",
  corTexto: "Cor do texto / títulos",
  corFundo: "Cor de fundo da página",
};

export default function AppearanceForm({ initial }: { initial: Fields }) {
  const [state, formAction, pending] = useActionState<UpdateAppearanceState, FormData>(
    updateAppearance,
    undefined
  );
  const [values, setValues] = useState(initial);

  return (
    <form action={formAction} className="space-y-5">
      {(Object.keys(LABELS) as Array<keyof Fields>).map((field) => (
        <div key={field} className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-full border border-card-border shrink-0"
            style={{ backgroundColor: values[field] || "#ffffff" }}
          />
          <div className="flex-1">
            <label className="block text-sm font-medium text-navy mb-1">{LABELS[field]}</label>
            <input
              name={field}
              placeholder="#rrggbb"
              value={values[field]}
              onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
              className="w-full rounded-md border border-card-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy/30"
            />
          </div>
        </div>
      ))}

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Aparência atualizada.</p>}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md")}>
        {pending ? "Salvando..." : "Salvar aparência"}
      </button>
    </form>
  );
}
