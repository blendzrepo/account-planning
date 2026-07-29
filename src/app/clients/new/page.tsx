import { createClient } from "@/lib/actions/clients";

export default function NewClientPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-6">
      <h1 className="text-2xl font-extrabold text-navy mb-1">Novo cliente</h1>
      <p className="text-gray-500 mb-8">Crie um novo Account Business Plan.</p>
      <ClientForm />
    </div>
  );
}

function ClientForm() {
  async function submit(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const tag = String(formData.get("tag") ?? "").trim();
    if (!name) return;
    await createClient({ name, tag });
  }

  return (
    <form action={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Nome do cliente</label>
        <input
          name="name"
          required
          placeholder="ex: Azul Linhas Aéreas"
          className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Selo / tag (opcional)</label>
        <input
          name="tag"
          placeholder="ex: AZUL"
          className="w-full rounded-md border border-card-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <button type="submit" className="rounded-md bg-navy text-white px-4 py-2 text-sm font-semibold hover:opacity-90">
        Criar cliente
      </button>
    </form>
  );
}
