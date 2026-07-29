import type { ReactNode } from "react";

type Props = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function SectionShell({ id, number, title, subtitle, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 mb-16">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-3 w-3 rounded-sm bg-accent" />
        <span className="text-sm font-bold tracking-wide text-accent">{number}</span>
      </div>
      <h2 className="text-3xl font-extrabold text-navy mb-2">{title}</h2>
      <p className="italic text-gray-500 mb-6">{subtitle}</p>
      {children}
    </section>
  );
}
