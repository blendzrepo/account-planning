import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-navy mb-1">Account Business Plan</h1>
        <p className="text-gray-500 mb-8">Entre com seu usuário e senha.</p>
        <LoginForm />
      </div>
    </div>
  );
}
