"use client";

import EditableField from "./EditableField";

type Props = {
  label: string;
  displayValue: string;
  rawValue: string;
  onSave: (value: string) => Promise<void>;
};

export default function StatCard({ label, displayValue, rawValue, onSave }: Props) {
  return (
    <div className="rounded-lg bg-navy px-6 py-5 text-white">
      <EditableField
        value={rawValue}
        formatDisplay={displayValue}
        onSave={onSave}
        as="span"
        className="text-2xl font-extrabold text-white block"
        placeholder="—"
      />
      <div className="mt-2 text-xs font-bold tracking-wide text-accent uppercase">{label}</div>
    </div>
  );
}
