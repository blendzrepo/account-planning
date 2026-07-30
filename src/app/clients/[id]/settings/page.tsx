import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { renameClient, deleteClient } from "@/lib/actions/clients";
import ConfirmForm from "@/components/ui/ConfirmForm";
import { buttonClasses } from "@/components/ui/button-styles";
import Link from "next/link";

export default async function ClientSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  async function submitRename(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const tag = String(formData.get("tag") ?? "").trim();
    if (!name) return;
    await renameClient(id, { name, tag });
  }

  async function submitDelete() {
    "use server";
    await deleteClient(id);
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4 md:py-16 md:px-6">
      <Link href={`/clients/${id}`} className="text-sm text-navy hover:underline">
        ← voltar para o plano
      </Link>
      <h1 className="text-2xl font-extrabold text-navy mt-4 mb-1">Gerenciar cliente</h1>
      <p className="text-gray-500 mb-8">Edite o nome/tag ou remova este cliente e todo o seu plano.</p>

      <form action={submitRename} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Nome do cliente</label>
          <input
            name="name"
            required
            defaultValue={client.name}
            className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Selo / tag</label>
          <input
            name="tag"
            defaultValue={client.tag ?? ""}
            className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
          />
        </div>
        <button type="submit" className={buttonClasses("primary", "md")}>
          Salvar alterações
        </button>
      </form>

      <div className="border-t border-card-border pt-6">
        <h2 className="text-sm font-semibold text-red-600 mb-2">Zona de risco</h2>
        <p className="text-sm text-gray-500 mb-3">
          Remove permanentemente este cliente e todo o conteúdo do plano (stakeholders, riscos, oportunidades etc.).
        </p>
        <ConfirmForm action={submitDelete} message={`Remover "${client.name}" e todo o seu plano? Essa ação não pode ser desfeita.`}>
          <button type="submit" className={buttonClasses("danger", "md")}>
            Remover cliente
          </button>
        </ConfirmForm>
      </div>
    </div>
  );
}
