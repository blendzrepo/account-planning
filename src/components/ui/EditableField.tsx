"use client";

import { useState, useTransition } from "react";
import { buttonClasses } from "./button-styles";

type Props = {
  value: string;
  onSave: (value: string) => Promise<void>;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  as?: "span" | "div";
  /** Texto formatado para exibição (ex.: "R$ 10,3 mi") quando não estiver em edição. */
  formatDisplay?: string;
};

export default function EditableField({
  value,
  onSave,
  multiline = false,
  placeholder = "preencher",
  className = "",
  as = "div",
  formatDisplay,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [pending, startTransition] = useTransition();

  if (editing) {
    // Deliberately not reusing `className` here — it's tuned for the display
    // state (e.g. large white text on a navy card) and would otherwise fight
    // an editable input's own sizing/contrast needs and can force overflow
    // in narrow containers.
    const inputClassName = "min-w-0 flex-1 rounded border border-card-border bg-white px-2 py-1 text-sm text-gray-900";
    return (
      <div className="flex gap-2 items-start min-w-0">
        {multiline ? (
          <textarea
            autoFocus
            className={inputClassName}
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            className={inputClassName}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        )}
        <div className="flex flex-col gap-1 shrink-0">
          <button
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await onSave(draft);
                setEditing(false);
              })
            }
            className={buttonClasses("primary", "sm")}
          >
            Salvar
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className={buttonClasses("secondary", "sm")}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const Tag = as;
  return (
    <Tag
      onClick={() => setEditing(true)}
      className={`group cursor-text rounded px-1 -mx-1 hover:bg-black/[0.03] ${className}`}
      title="Clique para editar"
    >
      {value ? (
        <span className="whitespace-pre-wrap">{formatDisplay ?? value}</span>
      ) : (
        <span className="italic text-gray-400">{placeholder}</span>
      )}
      <span className="ml-1 opacity-0 group-hover:opacity-60 text-xs">✎</span>
    </Tag>
  );
}
