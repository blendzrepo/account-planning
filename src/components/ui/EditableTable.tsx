"use client";

import { useState, useTransition } from "react";

export type ColumnType = "text" | "textarea" | "number" | "select";

export type Column = {
  key: string;
  label: string;
  type?: ColumnType;
  options?: { value: string; label: string }[];
  /** Se definido, exibe row[displayKey] (pré-formatado no servidor) em vez de row[key] na visualização; a edição continua usando `key`. */
  displayKey?: string;
};

type Row = { id: string } & Record<string, unknown>;

type Props<T extends Row> = {
  columns: Column[];
  rows: T[];
  onAdd: (data: Record<string, string>) => Promise<void>;
  onUpdate: (id: string, data: Record<string, string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  emptyLabel?: string;
};

export default function EditableTable<T extends Row>({
  columns,
  rows,
  onAdd,
  onUpdate,
  onDelete,
  emptyLabel = "Nenhum item cadastrado ainda.",
}: Props<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  function startEdit(row: T) {
    const initial: Record<string, string> = {};
    columns.forEach((c) => {
      const v = row[c.key];
      initial[c.key] = v === null || v === undefined ? "" : String(v);
    });
    setDraft(initial);
    setEditingId(row.id);
    setAdding(false);
  }

  function startAdd() {
    const initial: Record<string, string> = {};
    columns.forEach((c) => (initial[c.key] = ""));
    setDraft(initial);
    setAdding(true);
    setEditingId(null);
  }

  function cancel() {
    setEditingId(null);
    setAdding(false);
    setDraft({});
  }

  function save() {
    startTransition(async () => {
      if (adding) {
        await onAdd(draft);
      } else if (editingId) {
        await onUpdate(editingId, draft);
      }
      cancel();
    });
  }

  function remove(id: string) {
    if (!confirm("Remover este item?")) return;
    startTransition(async () => {
      await onDelete(id);
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-card-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-deep text-white">
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {rows.length === 0 && !adding && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-gray-400 italic">
                  {emptyLabel}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? "bg-card/50" : "bg-white"}>
                {editingId === row.id ? (
                  <RowInputs columns={columns} draft={draft} setDraft={setDraft} />
                ) : (
                  columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-top whitespace-pre-wrap">
                      {c.displayKey ? formatValue(row[c.displayKey], { ...c, type: "text" }) : formatValue(row[c.key], c)}
                    </td>
                  ))
                )}
                <td className="px-4 py-3 align-top">
                  {editingId === row.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={save}
                        disabled={pending}
                        className="text-xs font-medium text-white bg-navy px-2 py-1 rounded hover:opacity-90"
                      >
                        Salvar
                      </button>
                      <button onClick={cancel} className="text-xs text-gray-500 hover:underline">
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(row)} className="text-xs text-navy underline decoration-dotted">
                        editar
                      </button>
                      <button
                        onClick={() => remove(row.id)}
                        disabled={pending}
                        className="text-xs text-red-500 underline decoration-dotted"
                      >
                        remover
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {adding && (
              <tr className="bg-amber-50/60">
                <RowInputs columns={columns} draft={draft} setDraft={setDraft} />
                <td className="px-4 py-3 align-top">
                  <div className="flex gap-2">
                    <button
                      onClick={save}
                      disabled={pending}
                      className="text-xs font-medium text-white bg-navy px-2 py-1 rounded hover:opacity-90"
                    >
                      Salvar
                    </button>
                    <button onClick={cancel} className="text-xs text-gray-500 hover:underline">
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!adding && (
        <button
          onClick={startAdd}
          className="w-full text-left px-4 py-2 text-sm text-navy hover:bg-card border-t border-card-border transition-colors"
        >
          + adicionar linha
        </button>
      )}
    </div>
  );
}

function RowInputs({
  columns,
  draft,
  setDraft,
}: {
  columns: Column[];
  draft: Record<string, string>;
  setDraft: (d: Record<string, string>) => void;
}) {
  return (
    <>
      {columns.map((c) => (
        <td key={c.key} className="px-2 py-2 align-top">
          {c.type === "textarea" ? (
            <textarea
              className="w-full min-w-[10rem] rounded border border-card-border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
              rows={2}
              value={draft[c.key] ?? ""}
              onChange={(e) => setDraft({ ...draft, [c.key]: e.target.value })}
            />
          ) : c.type === "select" ? (
            <select
              className="w-full rounded border border-card-border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
              value={draft[c.key] ?? ""}
              onChange={(e) => setDraft({ ...draft, [c.key]: e.target.value })}
            >
              <option value="">—</option>
              {c.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={c.type === "number" ? "number" : "text"}
              className="w-full min-w-[8rem] rounded border border-card-border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
              value={draft[c.key] ?? ""}
              onChange={(e) => setDraft({ ...draft, [c.key]: e.target.value })}
            />
          )}
        </td>
      ))}
    </>
  );
}

function formatValue(value: unknown, col: Column) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-gray-300">—</span>;
  }
  if (col.type === "select" && col.options) {
    const opt = col.options.find((o) => o.value === value);
    return opt?.label ?? String(value);
  }
  if (col.type === "number" && typeof value === "number") {
    return value.toLocaleString("pt-BR");
  }
  return String(value);
}
