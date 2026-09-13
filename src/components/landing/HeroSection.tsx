"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Orbes de luz orgânicos — substitui a malha de partículas */
type Orb = {
  bx: number;
  by: number;
  r: number;
  rgb: string;
  a: number;
  fx: number;
  fy: number;
  ph: number;
  ax: number;
  ay: number;
  depth: number;
};

const orbs: Orb[] = [
  {
    bx: 0.15,
    by: 0.28,
    r: 0.42,
    rgb: "51,188,228",
    a: 0.1,
    fx: 0.00016,
    fy: 0.00012,
    ph: 0.0,
    ax: 70,
    ay: 50,
    depth: 0.6,
  },
  {
    bx: 0.85,
    by: 0.22,
    r: 0.36,
    rgb: "33,207,229",
    a: 0.08,
    fx: 0.00013,
    fy: 0.00018,
    ph: 1.7,
    ax: 60,
    ay: 40,
    depth: 0.4,
  },
  {
    bx: 0.72,
    by: 0.75,
    r: 0.45,
    rgb: "30,111,217",
    a: 0.12,
    fx: 0.00011,
    fy: 0.00014,
    ph: 3.1,
    ax: 80,
    ay: 60,
    depth: 0.8,
  },
  {
    bx: 0.25,
    by: 0.82,
    r: 0.34,
    rgb: "51,188,228",
    a: 0.09,
    fx: 0.00019,
    fy: 0.0001,
    ph: 4.4,
    ax: 50,
    ay: 45,
    depth: 0.35,
  },
  {
    bx: 0.5,
    by: 0.45,
    r: 0.3,
    rgb: "120,220,255",
    a: 0.06,
    fx: 0.00015,
    fy: 0.00016,
    ph: 5.6,
    ax: 40,
    ay: 35,
    depth: 0.25,
  },
];

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;
    let mx = 0,
      my = 0;
    let tx = 0,
      ty = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const drawOrbs = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      mx += (tx - mx) * 0.03;
      my += (ty - my) * 0.03;
      const min = Math.min(w, h);
      for (const o of orbs) {
        const px =
          (o.bx + Math.sin(t * o.fx + o.ph) * 0.035) * w + mx * o.ax * o.depth;
        const py =
          (o.by + Math.cos(t * o.fy + o.ph) * 0.035) * h + my * o.ay * o.depth;
        const R = o.r * min;
        const g = ctx.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0, `rgba(${o.rgb},${o.a})`);
        g.addColorStop(1, `rgba(${o.rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(px - R, py - R, R * 2, R * 2);
      }
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      drawOrbs(0);
    } else {
      const loop = (t: number) => {
        drawOrbs(t);
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.09, ease: EASE },
  }),
};

/* Troque os avatares por fotos reais do time assim que possível —
   rostos de verdade são o maior sinal de "pessoas reais" que existe */
const team = [
  {
    initials: "A",
    radius: "46% 54% 52% 48% / 48% 52% 46% 54%",
    bg: "from-[#33BCE4] to-[#21CFE5]",
  },
  {
    initials: "R",
    radius: "54% 46% 48% 52% / 52% 48% 54% 46%",
    bg: "from-[#2FA8D8] to-[#1E6FD9]",
  },
  {
    initials: "M",
    radius: "50% 50% 44% 56% / 56% 44% 50% 50%",
    bg: "from-[#21CFE5] to-[#33BCE4]",
  },
  {
    initials: "+4",
    radius: "48% 52% 54% 46% / 46% 54% 48% 52%",
    bg: "from-[#1E6FD9] to-[#2FA8D8]",
  },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0A2956]"
    >
      <HeroCanvas />

      {/* Vinheta + brilho suave */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0c3270]/50 via-transparent to-[#0A2956]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(51,188,228,0.07),transparent_60%)]" />

      {/* Grão analógico */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-40 sm:px-10">
        {/* Kicker tipográfico (sem caixa) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#33BCE4]/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#33BCE4]">
            Estúdio de software colaborativo
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="max-w-4xl text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Software feito{" "}
          <em className="bg-gradient-to-r from-[#33BCE4] to-[#21CFE5] bg-clip-text font-serif italic text-transparent">
            com você
          </em>
          ,<br className="hidden sm:block" /> não só para você.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300"
        >
          Somos um estúdio enxuto que projeta, desenvolve e escala produtos
          digitais lado a lado com o seu time — do primeiro rascunho ao deploy.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#33BCE4] px-7 py-3.5 text-base font-semibold text-[#0A2956] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#33BCE4]/20"
          >
            Vamos conversar
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-base font-medium text-slate-300 underline decoration-white/20 underline-offset-8 transition-colors duration-300 hover:text-white hover:decoration-[#33BCE4]"
          >
            conhecer nossos projetos
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Prova humana */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-12 flex items-center gap-4"
        >
          <div className="flex -space-x-2.5">
            {team.map((m) => (
              <span
                key={m.initials}
                className={`grid h-9 w-9 place-items-center bg-gradient-to-br text-[11px] font-bold text-[#0A2956] ring-2 ring-[#0A2956] ${m.bg}`}
                style={{ borderRadius: m.radius }}
              >
                {m.initials}
              </span>
            ))}
          </div>
          <p className="max-w-[26ch] text-sm leading-snug text-slate-400">
            Um time pequeno de verdade, que entra junto com o seu desde o dia
            um.
          </p>
        </motion.div>
      </div>

      {/* Indicador de scroll editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
          explore
        </span>
        <div className="h-12 w-px overflow-hidden bg-white/10">
          <motion.div
            className="h-4 w-px bg-[#33BCE4]"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
