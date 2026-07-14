"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

const testimonials = [
  { quote: "A Anaprick transformou nossa infraestrutura legada em uma plataforma moderna capaz de suportar 10 vezes mais tráfego sem qualquer dificuldade.", name: "Sarah T.", role: "CTO, HealthBridge", initials: "ST", gradient: "from-[#33BCE4] to-[#21CFE5]" },
  { quote: "A atenção aos detalhes em design e engenharia é incomparável. Eles entregaram muito além das nossas expectativas.", name: "Marcus R.", role: "Fundador, Paystream", initials: "MR", gradient: "from-[#F98F23] to-orange-600" },
  { quote: "A escalabilidade da nossa plataforma melhorou drasticamente. Passamos de instabilidades diárias para 99,99% de uptime em três meses.", name: "Elena V.", role: "VP de Engenharia, CloudScale", initials: "EV", gradient: "from-[#21CFE5] to-cyan-600" },
  { quote: "Uma experiência verdadeiramente premium, do início ao lançamento. A comunicação da equipe foi tão excelente quanto o código.", name: "David K.", role: "CEO, RetailNext", initials: "DK", gradient: "from-purple-500 to-indigo-600" },
  { quote: "Eles não apenas desenvolveram o software. Eles nos ajudaram a repensar toda a estratégia do produto e a abordagem de mercado.", name: "Priya M.", role: "Líder de Produto, EduVue", initials: "PM", gradient: "from-pink-500 to-rose-600" },
  { quote: "Excelência em engenharia no seu mais alto nível. A arquitetura que entregaram continua sustentando nosso crescimento dois anos depois.", name: "James L.", role: "Diretor, LogiChain", initials: "JL", gradient: "from-emerald-500 to-teal-600" },
]

function TiltCard({ quote, name, role, initials, gradient }: (typeof testimonials)[0]) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="glass rounded-2xl p-6 w-80 md:w-96 flex-shrink-0 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(51,188,228,0.1)]"
    >
      <p className="text-slate-200 text-sm leading-relaxed mb-6">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
          {initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{name}</div>
          <div className="text-slate-400 text-xs">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

// Duplicate the set for a seamless infinite loop
const allCards = [...testimonials, ...testimonials]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden border-y border-white/5 bg-[#0A2956]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Histórias de Sucesso</h2>
        <p className="text-slate-400">A escolha das equipes que estão construindo o futuro.</p>
      </motion.div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-marquee w-max px-6">
          {allCards.map((t, i) => (
            <TiltCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
