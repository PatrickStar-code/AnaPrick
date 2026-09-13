"use client";

import { motion } from "framer-motion";
import { CornerDownRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

/* Cada dor, escrita com a voz de quem sente ela */
const challenges = [
  {
    quote: "Perdemos horas todo dia com tarefas repetitivas.",
    solution: "Automação inteligente",
    detail: "Fluxos que eliminam gargalos e devolvem o tempo do seu time.",
  },
  {
    quote: "Nossos sistemas não conversam entre si.",
    solution: "Plataformas unificadas",
    detail: "Uma arquitetura que conecta cada parte da operação.",
  },
  {
    quote: "Tudo trava justamente quando a demanda cresce.",
    solution: "Desempenho em tempo real",
    detail: "Sistemas rápidos, com resposta em milissegundos.",
  },
  {
    quote: "Os clientes desistem antes de chegar ao fim.",
    solution: "Interfaces intuitivas",
    detail: "Design centrado em pessoas, feito para converter.",
  },
  {
    quote: "A infraestrutura não acompanha o nosso crescimento.",
    solution: "Arquitetura elástica",
    detail: "Nuvem nativa que escala junto com a demanda.",
  },
  {
    quote: "Cada área tem “sua” verdade — e nenhuma bate.",
    solution: "Inteligência centralizada",
    detail: "Painéis unificados, uma única fonte de verdade.",
  },
];

export function ChallengesSection() {
  return (
    <section id="challenges" className="relative px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        {/* Coluna de título — sticky no desktop */}
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
                O que a gente resolve
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
            Reconhece{" "}
            <em className="font-serif italic text-[#33BCE4]">algum</em> desses?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="mt-6 max-w-sm text-base leading-relaxed text-slate-400"
          >
            Não faltam nomes bonitos para esses problemas — falta alguém para
            sentar do seu lado e resolver. A gente começa sempre pelo que dói
            hoje.
          </motion.p>
        </div>

        {/* Lista-diálogo */}
        <div>
          <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {challenges.map((c, i) => (
              <motion.li
                key={c.solution}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={Math.min(i, 3)}
                className="group py-8 transition-transform duration-500 ease-out lg:hover:translate-x-2"
              >
                <span className="text-[11px] font-semibold tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-[#33BCE4]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="mt-3 max-w-md font-serif text-xl italic leading-snug text-slate-300 transition-colors duration-300 group-hover:text-white sm:text-2xl">
                  “{c.quote}”
                </p>

                <div className="mt-4 flex items-start gap-2.5 pl-0.5">
                  <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-[#33BCE4]/70" />
                  <p className="text-sm leading-relaxed text-slate-400">
                    <span className="font-semibold text-[#33BCE4]">
                      {c.solution}
                    </span>
                    {" — "}
                    {c.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Footnote humano + CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-sm text-sm italic text-slate-500">
              Se você assentiu com a cabeça lendo mais de um item acima… a gente
              deveria conversar.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#33BCE4] underline decoration-[#33BCE4]/30 underline-offset-8 transition-colors hover:decoration-[#33BCE4]"
            >
              Vamos conversar
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
