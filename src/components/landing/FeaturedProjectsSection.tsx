"use client"

import { motion } from "framer-motion"

type Project = {
  tag: string
  tagColor: string
  title: string
  desc: string
  features: string[]
  stat1: { value: string; label: string }
  stat2: { value: string; label: string }
  mockLabel: string
  mockStatus: string
  mockIcon: React.ReactNode
  accentColor: string
  imageRight: boolean
}

const MapIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
  </svg>
)
const LockIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)
const BookIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const projects: Project[] = [
  {
    tag: "Logística",
    tagColor: "#33BCE4",
    title: "Plataforma de Logística Nova",
    desc: "Uma solução completa de cadeia de suprimentos que reduziu os custos operacionais em 40% e automatizou decisões manuais de roteamento em 12 centros de distribuição.",
    features: ["Fluxos de trabalho de despacho automatizados", "Rastreamento de frota em tempo real", "Alertas de manutenção preditiva"],
    stat1: { value: "40%", label: "Redução de Custos" },
    stat2: { value: "3x", label: "Entrega Mais Rápida" },
    mockLabel: "TELA HOLOGRÁFICA",
    mockStatus: "● ATIVA",
    mockIcon: <MapIcon />,
    accentColor: "#33BCE4",
    imageRight: true,
  },
  {
    tag: "Finanças",
    tagColor: "#F98F23",
    title: "FinVault Core",
    desc: "Uma infraestrutura de neobanking que atende a mais de 2 milhões de contas com segurança de nível militar e processamento de transações em menos de um segundo.",
    features: ["Arquitetura em conformidade com SOC 2 Tipo II", "Integração de usuários com maior conversão", "Detecção de fraudes em tempo real"],
    stat1: { value: "2M+", label: "Contas Ativas" },
    stat2: { value: "60%", label: "Aumento de Conversão" },
    mockLabel: "TERMINAL SEGURO",
    mockStatus: "● CRIPTOGRAFADO",
    mockIcon: <LockIcon />,
    accentColor: "#F98F23",
    imageRight: false,
  },
  {
    tag: "Educação",
    tagColor: "#21CFE5",
    title: "EduCloud LMS",
    desc: "Uma plataforma de aprendizagem colaborativa que atende a mais de 500 mil alunos com caminhos adaptativos e análise de progresso em tempo real para instituições.",
    features: ["Caminhos de aprendizagem adaptativos", "Salas de aula colaborativas ao vivo", "Melhoria na retenção de alunos"],
    stat1: { value: "500K+", label: "Alunos" },
    stat2: { value: "94%", label: "Taxa de Retenção" },
    mockLabel: "NÓ DE APRENDIZAGEM",
    mockStatus: "● ATIVO",
    mockIcon: <BookIcon />,
    accentColor: "#21CFE5",
    imageRight: true,
  },
]

function MonitorFrame({ label, status, icon, accent }: { label: string; status: string; icon: React.ReactNode; accent: string }) {
  return (
    <div className="monitor-frame rounded-2xl p-4 relative overflow-hidden">
      <div className="absolute inset-0 hologram-overlay z-10" />
      <div
        className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A2956, #020c1f)" }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl" style={{ background: accent + "33" }} />
        </div>
        <div className="relative z-10 text-center">
          <div className="font-mono text-xs mb-2 tracking-widest" style={{ color: accent, fontFamily: "var(--font-mono)" }}>
            {label}
          </div>
          <div
            className="w-48 h-32 rounded backdrop-blur-sm flex items-center justify-center"
            style={{ border: `1px solid ${accent}4d`, background: accent + "0d" }}
          >
            <div style={{ color: accent + "80" }}>{icon}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500" style={{ fontFamily: "var(--font-mono)" }}>
        <span>{label.replace(" ", "_").toUpperCase()}</span>
        <span style={{ color: accent }}>{status}</span>
      </div>
    </div>
  )
}

export function FeaturedProjectsSection() {
  return (
    <section
      id="work"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A2956, #071a3d, #0A2956)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Projetos em Destaque</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Resultados que falam mais alto que tecnologias.</p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Text */}
              <div className={proj.imageRight ? "order-2 md:order-1" : "order-2"}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold mb-4"
                  style={{ color: proj.tagColor }}
                >
                  {proj.tag}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{proj.title}</h3>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">{proj.desc}</p>
                <div className="space-y-3 mb-8">
                  {proj.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: proj.accentColor }} />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold text-white">{proj.stat1.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{proj.stat1.label}</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <div className="text-2xl font-bold text-white">{proj.stat2.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{proj.stat2.label}</div>
                  </div>
                </div>
              </div>

              {/* Monitor */}
              <motion.div
                className={proj.imageRight ? "order-1 md:order-2" : "order-1"}
                whileHover={{ rotateY: proj.imageRight ? 6 : -6 }}
                style={{ perspective: 1000 }}
              >
                <MonitorFrame
                  label={proj.mockLabel}
                  status={proj.mockStatus}
                  icon={proj.mockIcon}
                  accent={proj.accentColor}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
