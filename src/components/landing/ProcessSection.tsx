"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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

const phases = [
  {
    label: "Entender",
    steps: [
      {
        label: "Ideia",
        desc: "Tudo começa com uma conversa: entendemos a visão e o problema de verdade — não o briefing de superfície.",
      },
      {
        label: "Descoberta",
        desc: "Mapeamos requisitos, restrições e oportunidades junto com o seu time, sem jargão.",
      },
      {
        label: "Pesquisa de UX",
        desc: "Falamos com quem vai usar: dores, comportamentos e modelos mentais, na fonte.",
      },
    ],
  },
  {
    label: "Criar",
    steps: [
      {
        label: "Design",
        desc: "Interfaces em alta fidelidade e protótipos que você navega antes de existir uma linha de código.",
      },
      {
        label: "Desenvolvimento",
        desc: "Código robusto e escalável, com entregas semanais que você acompanha de perto.",
      },
      {
        label: "Testes",
        desc: "QA, segurança e performance afiados — confiança se constrói antes do deploy.",
      },
      {
        label: "Implantação",
        desc: "Lançamento sem downtime, com pipelines automatizados de CI/CD.",
      },
    ],
  },
  {
    label: "Evoluir",
    steps: [
      {
        label: "Melhoria contínua",
        desc: "Monitoramos, medimos e iteramos com base no uso real. O lançamento é só o começo.",
      },
    ],
  },
];

const flatSteps = phases.flatMap((p) => p.steps);
const total = flatSteps.length;

export function ProcessSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.65", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  return (
    <section id="process" className="relative px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        {/* Coluna sticky */}
        <div className="self-start lg:sticky lg:top-32">
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
                Nosso processo
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
            Como trabalhamos,{" "}
            <em className="font-serif italic text-[#33BCE4]">lado a lado</em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="mt-6 max-w-sm text-base leading-relaxed text-slate-400"
          >
            Um caminho claríssimo, refinado em mais de 100 produtos. Você
            acompanha cada etapa — e aprova cada entrega — antes de seguirmos.
          </motion.p>

          {/* Contador gigante — acompanha o scroll */}
          <div className="mt-14 hidden lg:block">
            <div className="flex items-end gap-3">
              <div className="h-20 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="block font-serif text-7xl italic leading-none text-white"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="pb-1 text-sm text-slate-500">
                / {String(total).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-[#33BCE4]">
              {flatSteps[active].label}
            </p>
          </div>
        </div>

        {/* Lista com linha de progresso */}
        <div ref={listRef} className="relative">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.07]" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-[#33BCE4] to-[#21CFE5]"
          />

          <div className="space-y-16 pl-8 sm:pl-12">
            {phases.map((phase, pi) => {
              const offset = phases
                .slice(0, pi)
                .reduce((n, p) => n + p.steps.length, 0);

              return (
                <div key={phase.label}>
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={0}
                    className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#33BCE4]/70" />
                    {phase.label}
                  </motion.p>

                  <div className="space-y-10">
                    {phase.steps.map((step, si) => {
                      const i = offset + si;
                      return (
                        <motion.div
                          key={step.label}
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, margin: "-60px" }}
                          custom={si}
                          onViewportEnter={() => setActive(i)}
                          viewport={{ margin: "-40% 0px -50% 0px" }}
                          className="flex items-baseline gap-5"
                        >
                          <span
                            className={cn(
                              "text-xs font-semibold tabular-nums tracking-[0.2em] transition-colors duration-500",
                              active === i
                                ? "text-[#33BCE4]"
                                : "text-slate-500",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold text-white sm:text-2xl">
                              {step.label}
                            </h3>
                            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
