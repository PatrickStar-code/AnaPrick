"use client"

import { motion } from "framer-motion"

const steps = [
  { label: "Ideia", desc: "Validar conceitos e definir a visão do produto com as partes interessadas.", side: "left" },
  { label: "Descoberta", desc: "Aprofundar-se nos requisitos de negócios, restrições e oportunidades.", side: "right" },
  { label: "Pesquisa de UX", desc: "Compreender os comportamentos, dores e modelos mentais dos usuários.", side: "left" },
  { label: "Design", desc: "Criar interfaces de alta fidelidade e protótipos interativos.", side: "right" },
  { label: "Desenvolvimento", desc: "Codificar soluções robustas e escaláveis com tecnologias modernas.", side: "left" },
  { label: "Testes", desc: "Garantia de qualidade (QA) abrangente, auditorias de segurança e ajustes de desempenho.", side: "right" },
  { label: "Implantação", desc: "Lançamentos com zero tempo de inatividade e pipelines automatizados de CI/CD.", side: "left" },
  { label: "Melhoria Contínua", desc: "Monitorar, iterar e evoluir com base em dados reais de uso.", side: "right" },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden bg-[#0A2956]">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nosso Processo</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Uma metodologia testada em batalha e refinada ao longo de mais de 100 produtos digitais.
          </p>
        </motion.div>

        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-44 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-transparent via-[#33BCE4]/40 to-transparent" />

        <div className="space-y-20">
          {steps.map((step, i) => {
            const isLeft = step.side === "left"
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative pl-20 md:pl-0 md:flex md:items-center"
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A2956] border-2 border-[#33BCE4] z-10 shadow-[0_0_15px_rgba(51,188,228,0.6)]" />

                {isLeft ? (
                  <>
                    <div className="md:w-1/2 md:pr-12 md:text-right">
                      <h3 className="text-2xl font-bold text-white mb-2">{step.label}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2 md:pl-12" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right" />
                    <div className="md:w-1/2 md:pl-12">
                      <h3 className="text-2xl font-bold text-white mb-2">{step.label}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
