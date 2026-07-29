import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Account Business Plan",
  description: "Gestão de planejamento de contas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
