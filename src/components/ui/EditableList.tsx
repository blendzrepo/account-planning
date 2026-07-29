"use client";

import { useState, useTransition } from "react";

type Item = { id: string; texto: string };

type Props = {
  items: Item[];
  onAdd: (texto: string) => Promise<void>;
  onUpdate: (id: string, texto: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  placeholder?: string;
};

export default function EditableList({ items, onAdd, onUpdate, onDelete, placeholder }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    const value = draft.trim();
    if (!value) {
      setEditingId(null);
      setAdding(false);
      return;
    }
    startTransition(async () => {
      if (adding) {
        await onAdd(value);
      } else if (editingId) {
        await onUpdate(editingId, value);
      }
      setEditingId(null);
      setAdding(false);
      setDraft("");
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      await onDelete(id);
    });
  }

  return (
    <div className="space-y-2">
      <ul className="space-y-2">
        {items.map((item) =>
          editingId === item.id ? (
            <li key={item.id} className="flex gap-2 items-start">
              <textarea
                autoFocus
                className="flex-1 rounded border border-card-border px-2 py-1 text-sm"
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <div className="flex flex-col gap-1">
                <button onClick={save} className="text-xs font-medium text-white bg-navy px-2 py-1 rounded">
                  Salvar
                </button>
                <button onClick={() => setEditingId(null)} className="text-xs text-gray-500">
                  Cancelar
                </button>
              </div>
            </li>
          ) : (
            <li key={item.id} className="group flex items-start gap-2 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/50" />
              <span className="flex-1">{item.texto}</span>
              <span className="hidden group-hover:flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft(item.texto);
                    setAdding(false);
                  }}
                  className="text-xs text-navy underline decoration-dotted"
                >
                  editar
                </button>
                <button onClick={() => remove(item.id)} disabled={pending} className="text-xs text-red-500 underline decoration-dotted">
                  remover
                </button>
              </span>
            </li>
          )
        )}
        {items.length === 0 && !adding && (
          <li className="text-sm italic text-gray-400">{placeholder ?? "preencher"}</li>
        )}
      </ul>
      {adding ? (
        <div className="flex gap-2 items-start">
          <textarea
            autoFocus
            className="flex-1 rounded border border-card-border px-2 py-1 text-sm"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <button onClick={save} className="text-xs font-medium text-white bg-navy px-2 py-1 rounded">
              Salvar
            </button>
            <button
              onClick={() => {
                setAdding(false);
                setDraft("");
              }}
              className="text-xs text-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setAdding(true);
            setEditingId(null);
            setDraft("");
          }}
          className="text-xs text-navy hover:underline"
        >
          + adicionar item
        </button>
      )}
    </div>
  );
}
