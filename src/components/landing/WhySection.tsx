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

const principles = [
  {
    title: "Resultado antes de tecnologia",
    desc: "Cada decisão de engenharia responde a um número seu: custo, conversão, tempo de entrega. O resto é preferência.",
  },
  {
    title: "Arquitetura para o volume de amanhã",
    desc: "Sistemas que crescem de mil para milhões de usuários sem precisar ser reescritos no caminho.",
  },
  {
    title: "Segurança e performance de fábrica",
    desc: "Auditoria, testes e carregamento abaixo de 1 segundo fazem parte do padrão — não do upsell.",
  },
  {
    title: "Parceria que não acaba no deploy",
    desc: "A gente fica por perto: suporte, otimização e orientação enquanto o produto cresce.",
  },
];

/* Ajuste para a realidade de vocês */
const meta = [
  { label: "onde estamos", value: "São Paulo, Brasil" },
  { label: "tempo de resposta", value: "até 1 dia útil" },
  { label: "idiomas", value: "português · inglês" },
];

export function WhySection() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto w-full max-w-6xl">
        {/* Kicker */}
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
              Sobre o estúdio
            </span>
          </div>
        </motion.div>

        {/* Manifesto */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="max-w-4xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Não somos fábrica de software. Somos o time que{" "}
          <em className="font-serif italic text-[#33BCE4]">
            entra no seu time
          </em>{" "}
          — pergunta, ouve, discorda quando precisa.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400"
        >
          Escolhemos projetos onde podemos dividir o risco com quem está do
          outro lado da mesa. É por isso que a maioria das parcerias que começou
          com um MVP continua até hoje — o produto cresce, e a gente cresce
          junto.
        </motion.p>

        {/* Linha humana */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-5"
        >
          {meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {m.label}
              </dt>
              <dd className="text-sm font-medium text-slate-200">{m.value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Princípios — colunas de texto, sem caixa */}
        <div className="mt-16 grid gap-x-8 gap-y-10 border-t border-white/[0.07] pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={Math.min(i, 3)}
              className="group"
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-[#33BCE4]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-semibold leading-snug text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
