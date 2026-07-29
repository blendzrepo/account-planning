import { getCurrentUser } from "@/lib/dal";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-sm mx-auto py-10 px-4 md:py-16 md:px-6">
      <h1 className="text-2xl font-extrabold text-navy mb-1">Minha conta</h1>
      <p className="text-gray-500 mb-8">
        Logado como <strong>{user?.username}</strong>. Altere sua senha abaixo.
      </p>
      <ChangePasswordForm />
    </div>
  );
}
