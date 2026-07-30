"use client";

import { useState, useTransition } from "react";
import { buttonClasses } from "./button-styles";

export type BadgeOption = { value: string; label: string; badgeClass: string };

type Stakeholder = {
  id: string;
  nome: string;
  cargo: string | null;
  papel: string;
  poder: string;
  agenda: string | null;
  estrategia: string | null;
  linkedinHighlight: string | null;
};

type Props = {
  rows: Stakeholder[];
  papelOptions: BadgeOption[];
  poderOptions: BadgeOption[];
  onAdd: (data: Record<string, string>) => Promise<void>;
  onUpdate: (id: string, data: Record<string, string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const FIELDS: Array<keyof Stakeholder> = [
  "nome",
  "cargo",
  "papel",
  "poder",
  "agenda",
  "estrategia",
  "linkedinHighlight",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function StakeholderCards({
  rows,
  papelOptions,
  poderOptions,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  function startEdit(row: Stakeholder) {
    const initial: Record<string, string> = {};
    FIELDS.forEach((key) => {
      const v = row[key];
      initial[key] = v === null || v === undefined ? "" : String(v);
    });
    setDraft(initial);
    setEditingId(row.id);
    setAdding(false);
  }

  function startAdd() {
    setDraft({
      nome: "",
      cargo: "",
      papel: papelOptions[papelOptions.length - 1]?.value ?? "",
      poder: poderOptions[1]?.value ?? poderOptions[0]?.value ?? "",
      agenda: "",
      estrategia: "",
      linkedinHighlight: "",
    });
    setAdding(true);
    setEditingId(null);
  }

  function cancel() {
    setEditingId(null);
    setAdding(false);
    setDraft({});
  }

  function save() {
    if (!draft.nome?.trim()) return;
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
    if (!confirm("Remover este stakeholder?")) return;
    startTransition(async () => {
      await onDelete(id);
    });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) =>
        editingId === row.id ? (
          <EditCard
            key={row.id}
            draft={draft}
            setDraft={setDraft}
            papelOptions={papelOptions}
            poderOptions={poderOptions}
            onSave={save}
            onCancel={cancel}
            pending={pending}
          />
        ) : (
          <ViewCard
            key={row.id}
            row={row}
            papelOptions={papelOptions}
            poderOptions={poderOptions}
            onEdit={() => startEdit(row)}
            onDelete={() => remove(row.id)}
            pending={pending}
          />
        )
      )}
      {adding && (
        <EditCard
          draft={draft}
          setDraft={setDraft}
          papelOptions={papelOptions}
          poderOptions={poderOptions}
          onSave={save}
          onCancel={cancel}
          pending={pending}
        />
      )}
      {!adding && (
        <button
          onClick={startAdd}
          className={buttonClasses("dashed", "md", "min-h-[8rem] flex-col text-sm !rounded-lg")}
        >
          <span className="text-2xl leading-none">+</span>
          <span>adicionar stakeholder</span>
        </button>
      )}
      {rows.length === 0 && !adding && (
        <p className="text-sm italic text-gray-400 sm:col-span-2 lg:col-span-3">
          Nenhum stakeholder cadastrado ainda.
        </p>
      )}
    </div>
  );
}

function Badge({ option, prefix }: { option?: BadgeOption; prefix?: string }) {
  if (!option) return null;
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${option.badgeClass}`}>
      {prefix}
      {option.label}
    </span>
  );
}

function FieldBlock({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</div>
      {value ? (
        <div className="whitespace-pre-wrap">{value}</div>
      ) : (
        <div className="italic text-gray-300">—</div>
      )}
    </div>
  );
}

function ViewCard({
  row,
  papelOptions,
  poderOptions,
  onEdit,
  onDelete,
  pending,
}: {
  row: Stakeholder;
  papelOptions: BadgeOption[];
  poderOptions: BadgeOption[];
  onEdit: () => void;
  onDelete: () => void;
  pending: boolean;
}) {
  const papel = papelOptions.find((o) => o.value === row.papel);
  const poder = poderOptions.find((o) => o.value === row.poder);

  return (
    <div className="flex flex-col rounded-lg border border-card-border bg-white p-4">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
          {initials(row.nome)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold leading-tight text-navy">{row.nome}</div>
          {row.cargo && <div className="truncate text-xs text-gray-500">{row.cargo}</div>}
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Badge option={papel} />
        <Badge option={poder} prefix="Poder: " />
      </div>
      <div className="flex-1 space-y-2 text-xs text-gray-600">
        <FieldBlock label="Agenda / prioridades" value={row.agenda} />
        <FieldBlock label="Estratégia de relacionamento" value={row.estrategia} />
        <FieldBlock label="Destaque (LinkedIn)" value={row.linkedinHighlight} />
      </div>
      <div className="mt-3 flex gap-2 border-t border-card-border pt-3">
        <button onClick={onEdit} className={buttonClasses("ghost", "sm")}>
          editar
        </button>
        <button onClick={onDelete} disabled={pending} className={buttonClasses("dangerGhost", "sm")}>
          remover
        </button>
      </div>
    </div>
  );
}

function EditCard({
  draft,
  setDraft,
  papelOptions,
  poderOptions,
  onSave,
  onCancel,
  pending,
}: {
  draft: Record<string, string>;
  setDraft: (d: Record<string, string>) => void;
  papelOptions: BadgeOption[];
  poderOptions: BadgeOption[];
  onSave: () => void;
  onCancel: () => void;
  pending: boolean;
}) {
  const inputClass = "rounded border border-card-border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30";
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-navy/30 bg-amber-50/40 p-4">
      <input
        autoFocus
        placeholder="Nome"
        value={draft.nome ?? ""}
        onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
        className={`${inputClass} font-semibold`}
      />
      <input
        placeholder="Cargo / área"
        value={draft.cargo ?? ""}
        onChange={(e) => setDraft({ ...draft, cargo: e.target.value })}
        className={inputClass}
      />
      <div className="flex gap-2">
        <select
          value={draft.papel ?? ""}
          onChange={(e) => setDraft({ ...draft, papel: e.target.value })}
          className={`${inputClass} flex-1`}
        >
          {papelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={draft.poder ?? ""}
          onChange={(e) => setDraft({ ...draft, poder: e.target.value })}
          className={`${inputClass} flex-1`}
        >
          {poderOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Agenda / prioridades"
        rows={2}
        value={draft.agenda ?? ""}
        onChange={(e) => setDraft({ ...draft, agenda: e.target.value })}
        className={inputClass}
      />
      <textarea
        placeholder="Estratégia de relacionamento"
        rows={2}
        value={draft.estrategia ?? ""}
        onChange={(e) => setDraft({ ...draft, estrategia: e.target.value })}
        className={inputClass}
      />
      <textarea
        placeholder="Destaque (LinkedIn)"
        rows={2}
        value={draft.linkedinHighlight ?? ""}
        onChange={(e) => setDraft({ ...draft, linkedinHighlight: e.target.value })}
        className={inputClass}
      />
      <div className="mt-1 flex gap-2">
        <button onClick={onSave} disabled={pending} className={buttonClasses("primary", "sm")}>
          Salvar
        </button>
        <button onClick={onCancel} className={buttonClasses("secondary", "sm")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
