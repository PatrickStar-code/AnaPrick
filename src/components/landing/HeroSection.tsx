"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    const mouse = { x: -1000, y: -1000 }

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      orbitRadius: Math.random() * 100 + 50,
      orbitSpeed: (Math.random() - 0.5) * 0.02,
      angle: Math.random() * Math.PI * 2,
    }))

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", onMouse)

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.005
      const cx = width / 2
      const cy = height / 2

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250)
      grad.addColorStop(0, "rgba(51,188,228,0.12)")
      grad.addColorStop(0.5, "rgba(51,188,228,0.04)")
      grad.addColorStop(1, "rgba(51,188,228,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      ctx.beginPath()
      ctx.arc(cx, cy, 60 + Math.sin(time * 2) * 5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(51,188,228,${0.15 + Math.sin(time * 3) * 0.05})`
      ctx.lineWidth = 2
      ctx.stroke()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.angle += p.orbitSpeed
        const ox = Math.cos(p.angle) * p.orbitRadius * 0.3
        const oy = Math.sin(p.angle) * p.orbitRadius * 0.3
        p.x += p.dx
        p.y += p.dy
        const ddx = p.x - mouse.x
        const ddy = p.y - mouse.y
        const dist = Math.sqrt(ddx * ddx + ddy * ddy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.x += ddx * force * 0.05
          p.y += ddy * force * 0.05
        }
        if (p.x < 0 || p.x > width) p.dx *= -1
        if (p.y < 0 || p.y > height) p.dy *= -1
        const px = p.x + ox
        const py = p.y + oy
        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(51,188,228,${p.alpha})`
        ctx.fill()
        const dc = Math.hypot(px - cx, py - cy)
        if (dc < 200) {
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(cx, cy)
          ctx.strokeStyle = `rgba(51,188,228,${0.05 * (1 - dc / 200)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(p.x - particles[j].x, p.y - particles[j].y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(51,188,228,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden
    />
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const },
  }),
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A2956]"
    >
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c3270]/60 via-[#0A2956]/90 to-[#0A2956] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,188,228,0.08),transparent_70%)] z-0" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#33BCE4] text-xs font-semibold tracking-wide mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#33BCE4] animate-pulse" />
          Engenharia de Software Premium
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05] mb-8"
        >
          Engenharia de Experiências <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33BCE4] to-[#21CFE5]">
            Digitais
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Projetamos, desenvolvemos e escalamos software sob medida que transforma
          ideias em produtos digitais confiáveis.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full bg-[#33BCE4] text-[#0A2956] font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(51,188,228,0.4)]"
          >
            <span className="relative z-10">Começar Seu Projeto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#21CFE5] to-[#33BCE4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#work"
            className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 border border-transparent hover:border-[#33BCE4]/30 transition-all duration-300"
          >
            Explorar Nosso Trabalho
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#33BCE4] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
