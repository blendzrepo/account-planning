import { prisma } from "@/lib/prisma";
import ClientSwitcher from "@/components/ClientSwitcher";
import SectionNav from "@/components/SectionNav";

export default async function ClientsLayout({ children }: { children: React.ReactNode }) {
  const clients = await prisma.client.findMany({
    select: { id: true, name: true, tag: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-navy-deep text-white flex flex-col px-4 py-6 sticky top-0 h-screen">
        <div className="mb-2">
          <div className="text-lg font-extrabold leading-tight">Account Business Plan</div>
          <div className="text-xs text-white/40">Planejamento de contas</div>
        </div>
        <ClientSwitcher clients={clients} />
        <SectionNav />
      </aside>
      <main className="flex-1 min-w-0 bg-background">{children}</main>
    </div>
  );
}
