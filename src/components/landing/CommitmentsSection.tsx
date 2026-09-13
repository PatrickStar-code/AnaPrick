"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

const commitments = [
  {
    title: "Código no seu repositório, no seu nome",
    desc: "Você é dono de tudo o que pagou, desde o primeiro commit. Sem dependência de acesso, sem letra miúda.",
  },
  {
    title: "Demo funcionando toda semana",
    desc: "Você acompanha o progresso navegando no produto — não lendo relatório de horas.",
  },
  {
    title: "Orçamento fechado antes de começar",
    desc: "Se o escopo mudar no meio do caminho — porque muda — a gente conversa antes, nunca depois da fatura.",
  },
  {
    title: "Handover que dispensa a gente",
    desc: "Documentação, testes e conhecimento transferidos. Se um dia vocês seguirem sozinhos, ninguém fica refém.",
  },
];

export function CommitmentsSection() {
  return (
    <section id="commitments" className="relative px-6 py-28 sm:px-10 lg:py-36">
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
              Nossos compromissos
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
          Promessas que você pode{" "}
          <em className="font-serif italic text-[#33BCE4]">cobrar</em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-400"
        >
          Antes de prova social, prova de processo. Estas são as regras que a
          gente assume em todo contrato — e que você pode cobrar em qualquer
          reunião.
        </motion.p>

        {/* Compromissos — grade 2×2 com hairlines, estilo termos de parceria */}
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={Math.min(i, 2)}
              className="group border-t border-white/[0.12] pt-6"
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-[#33BCE4]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bloco de honestidade radical — o substituto do depoimento */}
        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 max-w-2xl"
        >
          <p className="font-serif text-xl italic leading-relaxed text-slate-300 sm:text-2xl">
            “Esta página não tem depoimentos — ainda. Preferimos começar honesto
            a começar inventado. Converse com a gente e julgue você mesmo.”
          </p>
          <footer className="mt-4 text-sm text-slate-500">
            — time anaprick
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
