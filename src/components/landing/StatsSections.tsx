"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

// ── Stats Section ────────────────────────────────────────────────────────────

function Counter({ target, suffix, decimal = 0 }: { target: number; suffix: string; decimal?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 12 })
  const display = useTransform(spring, (v) =>
    decimal > 0 ? v.toFixed(decimal) + suffix : Math.round(v) + suffix
  )

  useEffect(() => {
    if (isInView) spring.set(target)
  }, [isInView, target, spring])

  return (
    <motion.span ref={ref} style={{ fontFamily: "var(--font-mono)" }}>
      {display}
    </motion.span>
  )
}

const stats = [
  { target: 100, suffix: "+", label: "Projetos Entregues" },
  { target: 98, suffix: "%", label: "Satisfação dos Clientes" },
  { target: 15, suffix: "M+", label: "Usuários Impactados" },
  { target: 99.9, suffix: "%", decimal: 1, label: "Disponibilidade do Sistema" },
]

export function StatsSection() {
  return (
    <section id="stats" className="relative py-24 px-6 border-y border-white/5 bg-[#071a3d]/50">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-strong rounded-2xl p-8 text-center"
          >
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              <Counter target={s.target} suffix={s.suffix} decimal={s.decimal} />
            </div>
            <div className="text-sm text-[#33BCE4] uppercase tracking-wider font-semibold">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Industries Section ────────────────────────────────────────────────────────

const industries = [
  {
    label: "Saúde",
    detail: "Plataformas em conformidade com normas e telemedicina",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: "Finanças",
    detail: "Fintechs e sistemas de pagamento seguros",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Educação",
    detail: "LMS e ferramentas de aprendizagem colaborativa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    label: "Varejo",
    detail: "Comércio omnichannel e sistemas de PDV",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    label: "Logística",
    detail: "Gestão de frotas e otimização de rotas",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Construção",
    detail: "Gestão de projetos e modelagem BIM",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Tecnologia",
    detail: "Plataformas SaaS e ferramentas para devs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Manufatura",
    detail: "Monitoramento IoT e automação industrial",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export function IndustriesSection() {
  return (
    <section id="industries" className="relative py-32 px-6 bg-[#0A2956]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Setores que Atendemos</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Ampla experiência nos setores mais importantes do mercado.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-2xl p-6 text-center hover:border-[#33BCE4]/30 transition-all duration-500 cursor-default border border-white/8"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#33BCE4]/10 flex items-center justify-center text-[#33BCE4] mb-4 group-hover:scale-110 transition-transform">
                {ind.icon}
              </div>
              <h4 className="font-semibold text-white mb-1">{ind.label}</h4>
              <p className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {ind.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
