import { getCurrentUser, getCurrentOrg } from "@/lib/dal";
import { redirect } from "next/navigation";
import AppearanceForm from "./AppearanceForm";

export default async function AppearancePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "OWNER") {
    redirect("/");
  }
  const org = await getCurrentOrg();

  return (
    <div className="max-w-md mx-auto py-10 px-4 md:py-16 md:px-6">
      <h1 className="text-2xl font-extrabold text-navy mb-1">Aparência</h1>
      <p className="text-gray-500 mb-8">
        Personalize as cores da sua organização. Deixe em branco para usar o padrão.
      </p>
      <AppearanceForm
        initial={{
          corDestaque: org?.corDestaque ?? "",
          corSidebar: org?.corSidebar ?? "",
          corTexto: org?.corTexto ?? "",
          corFundo: org?.corFundo ?? "",
        }}
      />
    </div>
  );
}
