"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type ClientOption = { id: string; name: string; tag: string | null };

export default function ClientSwitcher({
  clients,
  onNavigate,
}: {
  clients: ClientOption[];
  onNavigate?: () => void;
}) {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const currentId = params?.id;

  return (
    <div className="border-b border-white/10 pb-4 mb-4">
      <label className="block text-[11px] font-semibold uppercase tracking-wide text-white/50 mb-1.5">
        Cliente
      </label>
      <select
        value={currentId ?? ""}
        onChange={(e) => {
          router.push(`/clients/${e.target.value}`);
          onNavigate?.();
        }}
        className="w-full rounded-md bg-white/10 text-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/60"
      >
        {clients.length === 0 && <option value="">Nenhum cliente</option>}
        {clients.map((c) => (
          <option key={c.id} value={c.id} className="text-black">
            {c.name}
            {c.tag ? ` (${c.tag})` : ""}
          </option>
        ))}
      </select>
      <div className="flex gap-2 mt-2">
        <Link
          href="/clients/new"
          onClick={onNavigate}
          className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-white/10"
        >
          + novo cliente
        </Link>
        {currentId && (
          <Link
            href={`/clients/${currentId}/settings`}
            onClick={onNavigate}
            className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            gerenciar
          </Link>
        )}
      </div>
    </div>
  );
}
