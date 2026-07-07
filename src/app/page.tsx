"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import {
  Code,
  Palette,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Mail,
  Globe,
  Sparkles,
  Star,
  Layers,
  Database,
  Cloud,
  Lock,
  Gauge,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Project data interface
interface Project {
  image: string;
  name: string;
  category: string;
  headline?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  description: string;
  tech: string[];
  status: string;
  source?: string;
}

import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

// Glow Component
const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "top" | "above" | "bottom" | "below" | "center" }
>(({ className, variant = "top", ...props }, ref) => {
  const variantClasses = {
    top: "top-0",
    above: "-top-[128px]",
    bottom: "bottom-0",
    below: "-bottom-[128px]",
    center: "top-[50%]",
  }

  return (
    <div ref={ref} className={cn("absolute w-full", variantClasses[variant], className)} {...props}>
      <div
        className={cn(
          "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(51,188,228,0.3)_10%,_transparent_60%)] sm:h-[512px]",
          variant === "center" && "-translate-y-1/2",
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(33,207,229,0.2)_10%,_transparent_60%)] sm:h-[256px]",
          variant === "center" && "-translate-y-1/2",
        )}
      />
    </div>
  )
})
Glow.displayName = "Glow"

// 3D Floating Element Component
function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  className,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Cube Component
function Cube3D({ className, size = 60 }: { className?: string; size?: number }) {
  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `translateZ(${size / 2}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `rotateY(90deg) translateZ(${size / 2}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `rotateY(180deg) translateZ(${size / 2}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30"
        style={{
          transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
        }}
      />
    </motion.div>
  )
}

// Service Card Component
function ServiceCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#33BCE4]/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#33BCE4] to-[#21CFE5] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// Tech Badge Component
function TechBadge({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.1, y: -4 }}
      className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium hover:bg-white/10 hover:border-[#33BCE4]/30 transition-all cursor-default"
    >
      {name}
    </motion.div>
  )
}

// Stat Counter Component
function StatCounter({ value, label, suffix = "", delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })
  const springValue = useSpring(0, { stiffness: 50, damping: 10 })
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="text-white/60">{label}</div>
    </motion.div>
  )
}

// Differential Card Component
function DifferentialCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#33BCE4]/30 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#33BCE4] to-[#21CFE5] flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
          {icon}
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

// Wave Separator Component
function WaveSeparator({ flip = false }: { flip?: boolean }) {
  return (
    <div className={cn("absolute left-0 w-full overflow-hidden leading-none", flip ? "bottom-0 rotate-180" : "top-0")}>
      <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-[#0A2956]"
        />
      </svg>
    </div>
  )
}

 // Main Landing Page Component

 // 3D scene components
 function FloatingCubes() {
   const ref = useRef<THREE.Group>(null!);
   const { mouse } = useThree();
   useFrame(() => {
     if (ref.current) {
       ref.current.rotation.x = mouse.y * Math.PI;
       ref.current.rotation.y = mouse.x * Math.PI;
       ref.current.rotation.z += 0.001;
     }
   });
   const positions: [number, number, number][] = [
       [-1, 0, 0],
       [1, 0, 0],
       [0, 1, 0],
       [0, -1, 0],
     ];
   return (
     <group>
       {positions.map((pos, i) => (
         <mesh key={i} position={pos} ref={i === 0 ? ref : undefined}>
           <boxGeometry args={[0.6, 0.6, 0.6]} />
           <meshStandardMaterial
             color={`hsl(${i * 90}, 70%, 60%)`}
             transparent
             opacity={0.8}
           />
         </mesh>
       ))}
     </group>
   );
 }

 function Projects3DScene() {
   const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
   return (
     <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 50 }}>
       <ambientLight intensity={0.5} />
       <directionalLight position={[5, 5, 5]} intensity={0.8} />
       <Suspense fallback={null}>
         <FloatingCubes />
       </Suspense>
       {!isMobile && <OrbitControls enableZoom={false} autoRotateSpeed={0.5} />}
     </Canvas>
   );
 }

 // Project Card component
 function ProjectCard({
   image,
   name,
   category,
   description,
   tech,
   status,
   source,
   delay = 0,
 }: {
   image: string;
   name: string;
   category: string;
   description: string;
   tech: string[];
   status: string;
   source?: string;
   delay?: number;
 }) {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true });
   return (
     <motion.div
       ref={ref}
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6, delay }}
       whileHover={{
         scale: 1.04,
         rotateX: isInView ? 5 : 0,
         rotateY: isInView ? 5 : 0,
       }}
       className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden group"
     >
       <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
         <img
           src={image}
           alt={name}
           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
       </div>
       <h3 className="text-xl font-bold text-white">{name}</h3>
       <p className="text-sm text-white/70">{category}</p>
       <p className="mt-2 text-white/80 text-sm">{description}</p>
       <div className="mt-3 flex flex-wrap gap-2">
         {tech.map((t) => (
           <span
             key={t}
             className="px-2 py-1 text-xs bg-white/20 text-white rounded"
           >
             {t}
           </span>
         ))}
       </div>
       <div className="mt-3 flex items-center justify-between text-white/80 text-sm">
         <span>Status: {status}</span>
         {source && (
           <a
             href={source}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-1 hover:text-white"
           >
             Código Fonte <ArrowRight className="w-3 h-3" />
           </a>
         )}
       </div>
       <div className="mt-4 flex gap-2">
         <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
           Ver Projeto
         </Button>
         {source && (
           <Button
             size="sm"
             variant="outline"
             className="bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/10"
           >
             Código Fonte
           </Button>
         )}
       </div>
     </motion.div>
   );
 }

 // Device mock to represent project UI
function DeviceMock() {
  return (
    <motion.div
      className="relative w-80 h-48 md:w-[500px] md:h-[300px] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden"
      animate={{ rotateY: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </motion.div>
  );
}

// Showcase for each project, full‑viewport experience
function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-6 py-20"
    >
      <motion.div
        style={{ opacity, y }}
        className="md:w-1/2 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white">{project.name}</h3>
        <p className="text-xl text-white/80">{project.headline || project.description}</p>
        <p className="text-white/70">{project.challenge}</p>
        <p className="text-white/70">{project.solution}</p>
        <p className="text-white/80 font-semibold">{project.result}</p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Ver Caso
        </Button>
      </motion.div>
      <motion.div
        style={{ opacity, y: -y }}
        className="md:w-1/2 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
      >
        <DeviceMock />
      </motion.div>
    </section>
  );
}

// Main Landing Page Component
export default function AnaprickSystemLanding() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const texts: any = {
    pt: {
      tagline: 'Soluções Digitais Sob Medida',
      title: 'Anaprick System',
      description: 'Transformamos ideias em soluções digitais inovadoras. Desenvolvimento de sistemas e websites de alta performance.',
      requestQuote: 'Solicitar Orçamento',
      viewServices: 'Conhecer Serviços',
      services: [
        { title: 'Desenvolvimento de Websites', description: 'Sites modernos, responsivos e otimizados para conversão, construídos com as melhores tecnologias do mercado.' },
        { title: 'Sistemas Web', description: 'Aplicações web robustas e escaláveis, desenvolvidas sob medida para atender suas necessidades específicas.' },
        { title: 'APIs', description: 'APIs RESTful seguras e performáticas para integração entre sistemas e aplicações.' },
        { title: 'Dashboards', description: 'Painéis administrativos intuitivos com visualização de dados em tempo real.' },
        { title: 'Consultoria', description: 'Consultoria especializada em arquitetura de software e melhores práticas de desenvolvimento.' },
        { title: 'UI/UX', description: 'Design de interfaces modernas e experiências de usuário que encantam e convertem.' },
      ],
      differentials: [
        { title: 'Performance', description: 'Aplicações otimizadas para máxima velocidade e eficiência' },
        { title: 'Escalabilidade', description: 'Arquitetura preparada para crescer com seu negócio' },
        { title: 'Segurança', description: 'Proteção de dados e conformidade com padrões internacionais' },
        { title: 'Código Limpo', description: 'Desenvolvimento seguindo as melhores práticas e padrões' },
        { title: 'UX Moderna', description: 'Interfaces intuitivas e experiências memoráveis' },
        { title: 'Suporte', description: 'Acompanhamento contínuo e suporte técnico dedicado' },
      ],
      about: {
        tag: 'Sobre Nós',
        heading: 'Especialistas em Tecnologia',
        description: 'Somos uma empresa especializada em desenvolvimento de soluções digitais modernas, rápidas, escaláveis e personalizadas. Combinamos expertise técnica com design inovador para criar produtos que impulsionam o crescimento do seu negócio.',
      },
      servicesSection: {
        tag: 'Nossos Serviços',
        heading: 'O que fazemos',
      },
      differentialsSection: {
        tag: 'Diferenciais',
        heading: 'Por que nos escolher',
      },
      cta: {
        heading: 'Pronto para transformar seu negócio?',
        paragraph: 'Entre em contato e descubra como podemos ajudar a levar sua empresa para o próximo nível digital.',
        button: 'Solicitar Orçamento Agora',
      },
    },
    en: {
      tagline: 'Tailored Digital Solutions',
      title: 'Anaprick System',
      description: 'We turn ideas into innovative digital solutions. Developing high‑performance systems and websites.',
      requestQuote: 'Request Quote',
      viewServices: 'View Services',
      services: [
        { title: 'Website Development', description: 'Modern, responsive, conversion‑optimized sites built with top‑tier technologies.' },
        { title: 'Web Systems', description: 'Robust, scalable web applications custom‑built to meet specific needs.' },
        { title: 'APIs', description: 'Secure, high‑performance RESTful APIs for system integration.' },
        { title: 'Dashboards', description: 'Intuitive admin panels with real‑time data visualization.' },
        { title: 'Consulting', description: 'Specialized consulting in software architecture and best development practices.' },
        { title: 'UI/UX', description: 'Modern interface design and user experiences that delight and convert.' },
      ],
      differentials: [
        { title: 'Performance', description: 'Apps optimized for maximum speed and efficiency' },
        { title: 'Scalability', description: 'Architecture ready to grow with your business' },
        { title: 'Security', description: 'Data protection and compliance with international standards' },
        { title: 'Clean Code', description: 'Development following best practices and standards' },
        { title: 'Modern UX', description: 'Intuitive interfaces and memorable experiences' },
        { title: 'Support', description: 'Continuous monitoring and dedicated technical support' },
      ],
      about: {
        tag: 'About Us',
        heading: 'Experts in Technology',
        description: 'We are a company specialized in developing modern, fast, scalable, and custom digital solutions. We combine technical expertise with innovative design to create products that drive your business growth.',
      },
      servicesSection: {
        tag: 'Our Services',
        heading: 'What we do',
      },
      differentialsSection: {
        tag: 'Differentials',
        heading: 'Why Choose Us',
      },
      cta: {
        heading: 'Ready to transform your business?',
        paragraph: 'Get in touch and discover how we can help take your company to the next digital level.',
        button: 'Request a Quote Now',
      },
    },
  }

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Service icons remain constant
  const serviceIcons = [
    <Globe className="w-6 h-6 text-white" />, // 0
    <Code className="w-6 h-6 text-white" />, // 1
    <Layers className="w-6 h-6 text-white" />, // 2
    <Palette className="w-6 h-6 text-white" />, // 3
    <Users className="w-6 h-6 text-white" />, // 4
    <Sparkles className="w-6 h-6 text-white" />, // 5
  ];

  const services = serviceIcons.map((icon, i) => ({
    icon,
    title: texts[lang].services[i].title,
    description: texts[lang].services[i].description,
  }));

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "NestJS",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ]

  // Differential icons remain constant
  const differentialIcons = [
    <Gauge className="w-6 h-6 text-white" />, // 0
    <TrendingUp className="w-6 h-6 text-white" />, // 1
    <Shield className="w-6 h-6 text-white" />, // 2
    <Code className="w-6 h-6 text-white" />, // 3
    <Sparkles className="w-6 h-6 text-white" />, // 4
    <Users className="w-6 h-6 text-white" />, // 5
  ];

  const differentials = differentialIcons.map((icon, i) => ({
    icon,
    title: texts[lang].differentials[i].title,
    description: texts[lang].differentials[i].description,
  }));

  const projects = [
  {
    image: "https://via.placeholder.com/400x300",
    name: "Anaprick Dashboard",
    category: "Web App",
    headline: "Dashboard de gestão em tempo real",
    challenge: "Operações manuais dificultavam a tomada de decisão rápida.",
    solution: "Implementamos visualizações em tempo real, alertas e KPIs interativos.",
    result: "Aumento de 35% na eficiência operacional.",
    description: "Painel administrativo em tempo real para monitoramento de métricas de negócios.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Docker"],
    status: "Em produção",
    source: "https://github.com/yourorg/anaprick-dashboard",
  },
  {
    image: "https://via.placeholder.com/400x300",
    name: "Open Finance API",
    category: "API",
    headline: "Integração de dados financeiros",
    challenge: "Necessidade de consolidar dados de múltiplas instituições.",
    solution: "API unificada com autenticação OAuth2 e caching inteligente.",
    result: "Redução de 40% no tempo de integração de novos parceiros.",
    description: "Integração com Banco Central do Brasil para dados financeiros em tempo real.",
    tech: ["Node.js", "NestJS", "PostgreSQL", "Docker", "AWS"],
    status: "Em desenvolvimento",
    source: "",
  },
  {
    image: "https://via.placeholder.com/400x300",
    name: "Mobile Banking App",
    category: "Mobile App",
    headline: "App bancário para clientes móveis",
    challenge: "Experiência inconsistente entre Android e iOS.",
    solution: "Aplicativo React Native com design responsivo e navegação fluida.",
    result: "Aumento de 25% no engajamento de usuários móveis.",
    description: "Aplicativo Android/iOS para gerenciamento de contas e pagamentos.",
    tech: ["React Native", "TypeScript", "Expo", "Firebase"],
    status: "Concluído",
    source: "https://github.com/yourorg/mobile-banking",
  },
];

  return (
    <div className="relative w-full bg-[#0A2956] overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Language toggle */}
          <div className="absolute top-4 right-4">
            <Button size="sm" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className="bg-white/10 text-white">
              {lang === 'pt' ? 'EN' : 'PT-BR'}
            </Button>
          </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Glow variant="center" className="opacity-40" />
        </div>

        {/* 3D Floating Elements */}
        <div className="top-20 left-10 hidden lg:block absolute" style={{ perspective: "1000px" }}>
          <FloatingElement delay={0} duration={8}>
            <Cube3D size={80} />
          </FloatingElement>
        </div>

        <div className="bottom-32 right-20 hidden lg:block absolute" style={{ perspective: "1000px" }}>
          <FloatingElement delay={2} duration={10}>
            <Cube3D size={60} />
          </FloatingElement>
        </div>

        <FloatingElement delay={1} duration={7} className="top-1/3 right-10 hidden md:block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#33BCE4]/20 to-[#21CFE5]/20 border border-[#33BCE4]/30 backdrop-blur-xl" />
        </FloatingElement>

        <FloatingElement delay={3} duration={9} className="bottom-1/4 left-20 hidden md:block">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F98F23]/20 to-[#33BCE4]/20 border border-[#F98F23]/30 backdrop-blur-xl" />
        </FloatingElement>

        <motion.div style={{ y: y1, opacity }} className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
          >
            <Rocket className="w-4 h-4 text-[#F98F23]" />
            <span className="text-sm text-white/80">{texts[lang].tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-[#33BCE4] to-[#21CFE5] bg-clip-text text-transparent">
              Anaprick System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {texts[lang].description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-[#F98F23] to-[#F98F23]/90 hover:from-[#F98F23]/90 hover:to-[#F98F23]/80 text-white border-0 shadow-lg shadow-[#F98F23]/25 px-8 py-6 text-lg font-semibold"
            >
              {texts[lang].requestQuote}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/10 hover:border-[#33BCE4]/30 px-8 py-6 text-lg font-semibold"
            >
              {texts[lang].viewServices}
            </Button>
          </motion.div>
        </motion.div>

        <WaveSeparator flip />
      </section>

      {/* About Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#0A2956] to-[#0A2956]/95">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
              <Star className="w-4 h-4 text-[#F98F23]" />
              <span className="text-sm text-white/80">{texts[lang].about.tag}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {texts[lang].about.heading} <span className="bg-gradient-to-r from-[#33BCE4] to-[#21CFE5] bg-clip-text text-transparent">Tecnologia</span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Somos uma empresa especializada em desenvolvimento de soluções digitais modernas, rápidas, escaláveis e personalizadas. Combinamos expertise técnica com design inovador para criar produtos que impulsionam o crescimento do seu negócio.
            </p>
          </motion.div>
        </div>
        <WaveSeparator flip />
      </section>

      {/* Services Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#0A2956]/95 to-[#0A2956]/90">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-[#F98F23]" />
              <span className="text-sm text-white/80">{texts[lang].servicesSection.tag}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {texts[lang].servicesSection.heading} <span className="bg-gradient-to-r from-[#33BCE4] to-[#21CFE5] bg-clip-text text-transparent">fazemos</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
        <WaveSeparator flip />
      </section>

      {/* Projects Section */}
      <section className="relative bg-gradient-to-b from-[#0A2956]/90 to-[#0A2956]/85">
        {/* 3D Hero */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-6">
          <Projects3DScene />
        </div>
        {/* Project showcases */}
        {projects.map((proj, idx) => (
          <ProjectShowcase key={idx} project={proj} index={idx} />
        ))}
        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-[#F98F23] to-[#F98F23]/90 hover:from-[#F98F23]/90 hover:to-[#F98F23]/80 text-white border-0 shadow-xl shadow-[#F98F23]/30 px-8 py-5 text-lg font-semibold"
          >
            Fale Conosco
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#0A2956]/85 to-[#0A2956]/80">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
              <Award className="w-4 h-4 text-[#F98F23]" />
              <span className="text-sm text-white/80">{texts[lang].differentialsSection.tag}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {texts[lang].differentialsSection.heading} <span className="bg-gradient-to-r from-[#33BCE4] to-[#21CFE5] bg-clip-text text-transparent">nos escolher</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {differentials.map((diff, idx) => (
              <DifferentialCard key={idx} {...diff} delay={idx * 0.1} />
            ))}
          </div>
        </div>
        <WaveSeparator flip />
      </section>

      {/* Stats Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#0A2956]/80 to-[#0A2956]/75">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <StatCounter value={150} label="Projetos Entregues" suffix="+" delay={0} />
            <StatCounter value={98} label="Satisfação dos Clientes" suffix="%" delay={0.2} />
            <StatCounter value={5} label="Anos de Experiência" suffix="+" delay={0.4} />
          </div>
        </div>
        <WaveSeparator flip />
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#0A2956]/75 to-[#0A2956]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Glow variant="center" className="opacity-30" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#33BCE4]/10 to-transparent rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para <span className="bg-gradient-to-r from-[#33BCE4] to-[#21CFE5] bg-clip-text text-transparent">transformar</span> seu negócio?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Entre em contato e descubra como podemos ajudar a levar sua empresa para o próximo nível digital.
              </p>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#F98F23] to-[#F98F23]/90 hover:from-[#F98F23]/90 hover:to-[#F98F23]/80 text-white border-0 shadow-2xl shadow-[#F98F23]/30 px-10 py-7 text-xl font-semibold"
              >
                Solicitar Orçamento Agora
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 bg-[#0A2956] border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Anaprick System</h3>
              <p className="text-white/60">Soluções digitais que transformam negócios</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>contato@anaprick.system</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Globe className="w-4 h-4" />
                <span>anaprick.system</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Anaprick System. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
