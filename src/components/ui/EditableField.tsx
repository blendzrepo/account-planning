"use client";

import { useState, useTransition } from "react";

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
    return (
      <div className="flex gap-2 items-start">
        {multiline ? (
          <textarea
            autoFocus
            className={`flex-1 rounded border border-card-border px-2 py-1 text-sm ${className}`}
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            className={`flex-1 rounded border border-card-border px-2 py-1 text-sm ${className}`}
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
            className="text-xs font-medium text-white bg-navy px-2 py-1 rounded"
          >
            Salvar
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="text-xs text-gray-500"
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
