import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a14] px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal/40 blur-[110px]" />
        <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-[130px]" />
        <div className="absolute bottom-[-10rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute bottom-[-6rem] right-10 h-72 w-72 rounded-full bg-mint/25 blur-[110px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/40">
          <div className="flex flex-col items-center pt-10 pb-6 px-8 text-center">
            <div className="h-16 w-16 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
              </svg>
            </div>
            <h1 className="text-white font-bold tracking-wide uppercase text-sm">Account Business Plan</h1>
            <p className="text-white/50 text-xs mt-1.5">Entre com sua organização, usuário e senha.</p>
          </div>
          <div className="px-8 pb-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
