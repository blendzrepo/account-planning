import { prisma } from "@/lib/prisma";
import { verifySession, getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import AddTeamMemberForm from "./AddTeamMemberForm";
import ConfirmForm from "@/components/ui/ConfirmForm";
import { removeTeamMember } from "@/lib/actions/team";
import { buttonClasses } from "@/components/ui/button-styles";

export default async function TeamPage() {
  const session = await verifySession();
  const user = await getCurrentUser();
  if (!user || user.role !== "OWNER") {
    redirect("/");
  }

  const members = await prisma.user.findMany({
    where: { orgId: session.orgId },
    select: { id: true, username: true, role: true },
    orderBy: { username: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 md:py-16 md:px-6">
      <h1 className="text-2xl font-extrabold text-navy mb-1">Minha equipe</h1>
      <p className="text-gray-500 mb-8">
        Adicione ou remova usuários com acesso à sua organização.
      </p>

      <div className="bg-white border border-card-border rounded-lg p-4 mb-8">
        <AddTeamMemberForm />
      </div>

      <div className="bg-white border border-card-border rounded-lg divide-y divide-card-border">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-navy">{member.username}</div>
              <div className="text-xs text-gray-400">
                {member.role === "OWNER" ? "Usuário principal" : "Membro"}
              </div>
            </div>
            {member.role !== "OWNER" && (
              <ConfirmForm
                action={async () => {
                  "use server";
                  await removeTeamMember(member.id);
                }}
                message={`Remover o usuário "${member.username}"?`}
              >
                <button type="submit" className={buttonClasses("dangerGhost", "sm")}>
                  remover
                </button>
              </ConfirmForm>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
