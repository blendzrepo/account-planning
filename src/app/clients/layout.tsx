import { prisma } from "@/lib/prisma";
import AppSidebar from "@/components/AppSidebar";

export default async function ClientsLayout({ children }: { children: React.ReactNode }) {
  const clients = await prisma.client.findMany({
    select: { id: true, name: true, tag: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="md:flex md:min-h-screen">
      <AppSidebar clients={clients} />
      <main className="flex-1 min-w-0 bg-background">{children}</main>
    </div>
  );
}
