import { prisma } from "@/lib/prisma";
import AppSidebar from "@/components/AppSidebar";
import { verifySession, getCurrentUser, getCurrentOrg } from "@/lib/dal";

export default async function ClientsLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  const [clients, user, org] = await Promise.all([
    prisma.client.findMany({
      where: { orgId: session.orgId },
      select: { id: true, name: true, tag: true },
      orderBy: { name: "asc" },
    }),
    getCurrentUser(),
    getCurrentOrg(),
  ]);

  const themeStyle = {
    "--background": org?.corFundo || undefined,
    "--color-navy": org?.corTexto || undefined,
    "--color-navy-deep": org?.corSidebar || undefined,
    "--color-accent": org?.corDestaque || undefined,
    "--color-mint": org?.corDestaque || undefined,
  } as React.CSSProperties;

  return (
    <div className="md:flex md:min-h-screen" style={themeStyle}>
      <AppSidebar
        clients={clients}
        username={user?.username ?? ""}
        orgName={org?.name ?? ""}
        role={user?.role ?? "MEMBER"}
        isPlatform={org?.isPlatform ?? false}
      />
      <main className="flex-1 min-w-0 bg-background">{children}</main>
    </div>
  );
}
