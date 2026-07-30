import { prisma } from "@/lib/prisma";
import { getCurrentOrg } from "@/lib/dal";
import { redirect } from "next/navigation";
import CreateOrganizationForm from "./CreateOrganizationForm";

export default async function OrganizationsPage() {
  const org = await getCurrentOrg();
  if (!org?.isPlatform) {
    redirect("/");
  }

  const organizations = await prisma.organization.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      isPlatform: true,
      _count: { select: { users: true, clients: true } },
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 md:py-16 md:px-6">
      <h1 className="text-2xl font-extrabold text-navy mb-1">Organizações</h1>
      <p className="text-gray-500 mb-8">
        Crie novas organizações. Cada uma recebe seu próprio usuário principal.
      </p>

      <div className="bg-white border border-card-border rounded-lg p-4 mb-8">
        <CreateOrganizationForm />
      </div>

      <div className="bg-white border border-card-border rounded-lg divide-y divide-card-border">
        {organizations.map((o) => (
          <div key={o.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-navy">
                {o.name} {o.isPlatform && <span className="text-xs text-accent">(master)</span>}
              </div>
              <div className="text-xs text-gray-400">
                {o.slug} · {o._count.users} usuário(s) · {o._count.clients} cliente(s)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
