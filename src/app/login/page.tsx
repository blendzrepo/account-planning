import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 12% 12%, rgba(23,120,95,0.55), transparent 60%),
          radial-gradient(ellipse 65% 60% at 88% 88%, rgba(130,20,60,0.55), transparent 62%),
          radial-gradient(ellipse 60% 55% at 55% 45%, rgba(70,50,110,0.35), transparent 65%),
          #08080f
        `,
      }}
    >

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
