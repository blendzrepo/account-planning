"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type ClientOption = { id: string; name: string; tag: string | null };

export default function ClientSwitcher({ clients }: { clients: ClientOption[] }) {
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
        onChange={(e) => router.push(`/clients/${e.target.value}`)}
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
      <div className="flex gap-3 mt-2 text-xs">
        <Link href="/clients/new" className="text-accent hover:underline">
          + novo cliente
        </Link>
        {currentId && (
          <Link href={`/clients/${currentId}/settings`} className="text-white/50 hover:underline">
            gerenciar
          </Link>
        )}
      </div>
    </div>
  );
}
