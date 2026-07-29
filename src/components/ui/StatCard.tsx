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
    <div className="min-w-0 rounded-lg bg-navy px-4 py-4 text-white md:px-6 md:py-5">
      <EditableField
        value={rawValue}
        formatDisplay={displayValue}
        onSave={onSave}
        as="span"
        className="text-xl font-extrabold text-white block md:text-2xl"
        placeholder="—"
      />
      <div className="mt-2 text-xs font-bold tracking-wide text-accent uppercase">{label}</div>
    </div>
  );
}
