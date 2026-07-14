"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "#challenges", label: "Desafios" },
  { href: "#process", label: "Processo" },
  { href: "#work", label: "Projetos" },
  { href: "#about", label: "Sobre" },
]

export function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < lastY || current < 100)
      setLastY(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastY])

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      animate={{ y: visible ? 0 : "-150%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between rounded-2xl glass px-6 py-3">
          {/* Logo */}
          <a href="#hero" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#33BCE4] flex items-center justify-center text-[#0A2956] font-black text-sm">
              A
            </div>
            ANAPRICK
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-[#33BCE4] transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-[#33BCE4]/10 text-[#33BCE4] border border-[#33BCE4]/20 hover:bg-[#33BCE4]/20 transition-all duration-300 text-sm font-semibold"
          >
            Começar Projeto
          </a>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 rounded-2xl glass p-6"
            >
              <div className="flex flex-col gap-4 text-slate-300 font-medium">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-[#33BCE4] transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#contact" className="text-[#33BCE4] font-semibold">
                  Começar Projeto
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
