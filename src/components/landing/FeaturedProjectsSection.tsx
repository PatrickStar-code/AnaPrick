"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Project = {
  id: string;
  client: string;
  statement: string;
  detail: string;
  meta: string;
  href: string;
  monogram: string;
  image?: { src: string; alt: string };
};
const projects: Project[] = [
  {
    id: "01",
    client: "Magno Barbearia",
    statement: "Do caderno de marcação à agenda que se preenche sozinha.",
    detail:
      "endereço online, horários em um clique no WhatsApp e zero furo por esquecimento.",
    meta: "2026 · landing page",
    href: "https://magnobarbearias.vercel.app/",
    monogram: "MB",
    image: {
      src: "/projetos/magno.png",
      alt: "Página inicial do site da Magno Barbearia, com foto do espaço e botão de agendamento",
    },
  },
  {
    id: "02",
    client: "Estúdio 332",
    statement: "As fotos falam — o site só dá o palco.",
    detail: "galeria em destaque e orçamento a um clique, sem distração.",
    meta: "2026 · landing page",
    href: "https://estudio332.vercel.app/",
    monogram: "332",
    image: {
      src: "/projetos/estudio_332.png",
      alt: "Página inicial do site do Estúdio 332, com galeria de fotografias e apresentação do estúdio",
    },
  },
];
export function FeaturedProjectsSection() {
  /* Sempre há um projeto visível: começa no 01 e o mouse apenas troca */
  const [active, setActive] = useState(0);
  const activeProject = projects[active];

  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto w-full max-w-6xl">
        {/* Cabeçalho — igual ao anterior */}
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
              Trabalhos selecionados
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          Poucos projetos,{" "}
          <em className="font-serif italic text-[#33BCE4]">inteiros</em>.
        </motion.h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Lista — igual à anterior */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="self-start border-t border-white/[0.07]"
          >
            {projects.map((p, i) => (
              <li key={p.id} className="border-b border-white/[0.07]">
                <a
                  href={p.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(0)}
                  aria-current={active === i ? "true" : undefined}
                  className="group block py-6 sm:py-7"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "text-[11px] font-semibold tracking-[0.25em] transition-colors duration-300",
                        active === i ? "text-[#33BCE4]" : "text-slate-500",
                      )}
                    >
                      {p.id}
                    </span>
                    <h3
                      className={cn(
                        "text-2xl font-semibold tracking-tight transition-all duration-500 ease-out sm:text-3xl",
                        active === i
                          ? "translate-x-1.5 text-[#33BCE4]"
                          : "text-white",
                      )}
                    >
                      {p.client}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-9 text-sm leading-snug text-slate-400 sm:text-[15px]">
                    {p.statement}{" "}
                    <span className="text-slate-500">{p.detail}</span>
                  </p>
                </a>
              </li>
            ))}
          </motion.ul>

          {/* Painel — mockup de navegador, legenda fora da tela */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
            className="self-start lg:sticky lg:top-32"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1e3f] shadow-2xl shadow-black/40">
              {/* Chrome do navegador */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 text-center text-[11px] text-slate-400">
                  {new URL(activeProject.href).hostname}
                </div>
                <span className="w-[52px]" aria-hidden />
              </div>

              {/* Tela */}
              <div className="relative aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0"
                  >
                    {activeProject.image ? (
                      <Image
                        src={activeProject.image.src}
                        alt={activeProject.image.alt}
                        fill
                        priority={activeProject.id === "01"}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d3272] via-[#0A2956] to-[#071a3d]" />
                        <span className="absolute inset-0 grid place-items-center font-serif text-8xl italic text-white/10">
                          {activeProject.monogram}
                        </span>
                      </>
                    )}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                      style={{ backgroundImage: GRAIN }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Legenda — fora da imagem, nada colide */}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">
                  {activeProject.client}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-slate-400">
                  {activeProject.statement}
                </p>
              </div>
              <span className="mt-0.5 shrink-0 text-xs text-slate-500">
                {activeProject.meta}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              passe o mouse pelos projetos ao lado para trocar o preview
            </p>
          </motion.div>
        </div>

        {/* Fechamento — igual ao anterior */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm italic text-slate-500">
            Há espaço para o próximo nome dessa lista.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#33BCE4] underline decoration-[#33BCE4]/30 underline-offset-8 transition-colors hover:decoration-[#33BCE4]"
          >
            ser o próximo
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
