"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
}

const challenges = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Processos Manuais",
    pain: "Horas perdidas em tarefas repetitivas e erros humanos.",
    solution: "Automação Inteligente",
    solutionDetail: "Simplifique as operações com fluxos de trabalho baseados em IA que eliminam gargalos.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Sistemas Desconectados",
    pain: "Dados presos em silos impedem decisões em tempo real.",
    solution: "Plataformas Unificadas",
    solutionDetail: "Arquitetura centralizada que conecta cada parte do seu negócio.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Operações Lentas",
    pain: "Infraestrutura legada que não consegue acompanhar a demanda.",
    solution: "Desempenho em Tempo Real",
    solutionDetail: "Sistemas de alta velocidade projetados para tempos de resposta de milissegundos.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Experiência de Usuário Ruim",
    pain: "Os clientes vão embora devido a atritos e confusão.",
    solution: "Interfaces Intuitivas",
    solutionDetail: "Design centrado no ser humano que converte visitantes em usuários fiéis.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Gargalos de Crescimento",
    pain: "O crescimento trava seus sistemas quando você mais precisa deles.",
    solution: "Arquitetura Elástica",
    solutionDetail: "Infraestrutura nativa em nuvem que escala automaticamente com a demanda.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Silos de Dados",
    pain: "Informações dispersas bloqueiam a visibilidade estratégica.",
    solution: "Inteligência Centralizada",
    solutionDetail: "Painéis e relatórios unificados para total transparência.",
  },
]

function ChallengeCard({
  icon,
  title,
  pain,
  solution,
  solutionDetail,
  delay,
}: (typeof challenges)[0] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl p-8 hover:border-[#33BCE4]/30 transition-all duration-500 cursor-default border border-white/8"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#33BCE4] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#33BCE4] transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm">{pain}</p>
      <motion.div
        initial={false}
        className="mt-6 pt-6 border-t border-white/10 overflow-hidden"
        animate={{ opacity: 0, y: 8 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <p className="text-[#21CFE5] text-sm font-semibold mb-1">{solution}</p>
        <p className="text-slate-300 text-xs">{solutionDetail}</p>
      </motion.div>
    </motion.div>
  )
}

export function ChallengesSection() {
  return (
    <section
      id="challenges"
      className="relative py-32 px-6 overflow-hidden bg-[#0A2956]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2956] via-[#0d3272]/30 to-[#0A2956] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Problemas que Resolvemos
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Barreiras comuns que impedem as empresas de crescer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <ChallengeCard key={c.title} {...c} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
