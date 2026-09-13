"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

/* ⚠️ Troque pelo e-mail real de vocês */
const EMAIL = "ola@anaprick.com";

const afterSteps = [
  {
    n: "1",
    text: "Você escreve contando, em poucas linhas, o que está enfrentando.",
  },
  {
    n: "2",
    text: "Respondemos em até 1 dia útil — com perguntas, não com proposta.",
  },
  {
    n: "3",
    text: "Uma call de 30 min, sem compromisso. Se fizer sentido, seguimos.",
  },
];

export function CtaSection() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#33BCE4]/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#33BCE4]">
              Vamos conversar
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          Toda parceria boa começa com{" "}
          <em className="font-serif italic text-[#33BCE4]">uma conversa</em>{" "}
          descompromissada.
        </motion.h2>

        {/* O CTA é o próprio e-mail */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-12"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex flex-wrap items-baseline gap-x-4 text-3xl font-medium tracking-tight text-white underline decoration-[#33BCE4]/40 decoration-2 underline-offset-[10px] transition-colors duration-300 hover:decoration-[#33BCE4] sm:text-4xl lg:text-5xl"
          >
            {EMAIL}
            <ArrowUpRight className="h-7 w-7 self-center text-[#33BCE4] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8" />
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              agenda aberta para novos projetos
            </span>
            <span aria-hidden className="text-slate-600">
              ·
            </span>
            <span>NDA disponível se precisar</span>
            <span aria-hidden className="text-slate-600">
              ·
            </span>
            <a
              href="#"
              className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#33BCE4]"
            >
              ou chama no WhatsApp
            </a>
          </div>
        </motion.div>

        {/* O que acontece depois — desarma a ansiedade do primeiro contato */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          className="mt-16 grid gap-8 border-t border-white/[0.07] pt-10 sm:grid-cols-3"
        >
          {afterSteps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <span className="font-serif text-2xl italic text-[#33BCE4]/70">
                {s.n}
              </span>
              <p className="text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] px-6 py-12 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo — mesmo blob da navbar */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <span className="text-base font-semibold tracking-tight text-white">
              anaprick<span className="text-[#33BCE4]">.</span>
            </span>
          </a>

          {/* Redes como texto — sem fileira de ícones genéricos */}
          <nav className="flex gap-6 text-sm text-slate-400">
            {[
              { label: "LinkedIn", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "Instagram", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="transition-colors duration-300 hover:text-[#33BCE4]"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.05] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} anaprick — projetado e construído pelo
            próprio time.
          </p>
          <p className="flex items-center gap-4">
            <span>
              Juiz de fora - MG , Brasil — <LocalTime />
            </span>
            <a
              href="#hero"
              className="group inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-[#33BCE4]"
            >
              voltar ao topo
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
