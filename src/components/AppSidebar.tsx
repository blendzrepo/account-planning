"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClientSwitcher from "./ClientSwitcher";
import SectionNav from "./SectionNav";
import { logout } from "@/lib/actions/auth";

type ClientOption = { id: string; name: string; tag: string | null };

export default function AppSidebar({
  clients,
  username,
}: {
  clients: ClientOption[];
  username: string;
}) {
  const [open, setOpen] = useState(false);

  // Close the mobile drawer whenever the viewport grows into the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 bg-navy-deep text-white px-4 py-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="p-1 -ml-1 rounded hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-extrabold text-sm">Account Business Plan</span>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={close} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-navy-deep text-white flex flex-col px-4 py-6 transform transition-transform duration-200 ease-in-out overflow-y-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0`}
      >
        <div className="mb-2 flex items-start justify-between">
          <div>
            <div className="text-lg font-extrabold leading-tight">Account Business Plan</div>
            <div className="text-xs text-white/40">Planejamento de contas</div>
          </div>
          <button
            onClick={close}
            aria-label="Fechar menu"
            className="md:hidden p-1 rounded hover:bg-white/10 text-white/60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ClientSwitcher clients={clients} onNavigate={close} />
        <SectionNav onNavigate={close} />

        <div className="mt-4 pt-4 border-t border-white/10 text-xs">
          <div className="text-white/40 mb-1.5">Logado como</div>
          <div className="font-semibold mb-3">{username}</div>
          <div className="flex gap-2">
            <Link
              href="/clients/account"
              onClick={close}
              className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-white/10"
            >
              trocar senha
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-white/70 hover:bg-white/10"
              >
                sair
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
