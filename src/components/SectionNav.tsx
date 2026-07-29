"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "situacao", number: "01", label: "Situação atual" },
  { id: "stakeholders", number: "02", label: "Stakeholders" },
  { id: "objetivos", number: "03", label: "Objetivos e metas" },
  { id: "oportunidades", number: "04", label: "Oportunidades" },
  { id: "riscos", number: "05", label: "Riscos e churn" },
  { id: "swot", number: "06", label: "SWOT" },
  { id: "proposta", number: "07", label: "Proposta de valor" },
  { id: "acoes", number: "08", label: "Plano de ação" },
  { id: "metricas", number: "09", label: "Métricas e governança" },
];

export default function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-0.5">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                active === s.id
                  ? "bg-white/15 text-white font-semibold"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-[10px] font-bold text-accent">{s.number}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
