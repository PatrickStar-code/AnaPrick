"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

// ── CTA Section ──────────────────────────────────────────────────────────────

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 300, damping: 30 })
  const y = useSpring(rawY, { stiffness: 300, damping: 30 })
  const glowOpacity = useMotionValue(0)

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    rawY.set((e.clientY - rect.top - rect.height / 2) * 0.3)
    glowOpacity.set(1)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
    glowOpacity.set(0)
  }

  return (
    <motion.button
      ref={btnRef}
      id="start-project-cta"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05 }}
      className="relative inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#33BCE4] text-[#0A2956] font-bold text-xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(51,188,228,0.5)]"
    >
      <span className="relative z-10">Começar Seu Projeto</span>
      <motion.div
        className="absolute -inset-4 bg-[#33BCE4]/30 rounded-full blur-2xl"
        style={{ opacity: glowOpacity }}
      />
    </motion.button>
  )
}

export function CtaSection() {
  return (
    <section
      id="contact"
      className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden bg-[#0A2956]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#33BCE4]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,188,228,0.1),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-12 tracking-tight leading-[0.9]"
        >
          Vamos Construir Algo <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33BCE4] to-[#21CFE5]">
            Extraordinário.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto mb-12"
        >
          Sua visão merece uma engenharia que esteja à altura de sua ambição.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MagneticButton />
        </motion.div>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#0A2956]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#33BCE4] flex items-center justify-center text-[#0A2956] font-black text-xs">
            A
          </div>
          ANAPRICK
        </div>
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Anaprick. Todos os direitos reservados.
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-[#33BCE4] transition-colors">Privacidade</a>
          <a href="#" className="hover:text-[#33BCE4] transition-colors">Termos</a>
        </div>
      </div>
    </footer>
  )
}
