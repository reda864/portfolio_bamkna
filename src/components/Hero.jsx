import { motion } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import { useData } from "../context/DataContext"

export default function Hero() {
  const { team } = useData()
  const nameParts = (team.name || "BAAMAKNA 3X3").split(" ")
  const firstName = nameParts[0] || ""
  const restName = nameParts.slice(1).join(" ")

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 bg-surface">
        <video
          className="h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster={team.heroPoster || "/images/hero-poster.jpg"}
        >
          <source src={team.heroBg || "/videos/hero-bg.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/80 to-surface" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0d0d0d_70%)]" />
      </div>

      {/* Court line decoration */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <div className="h-[500px] w-[500px] rounded-full border-2 border-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Team logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-brand/50 bg-surface-card shadow-[0_0_30px_rgba(255,107,0,0.25)]"
        >
          {team.logo ? (
            <img src={team.logo} alt={team.name} className="h-full w-full object-contain p-2" />
          ) : (
            <div className="text-center">
              <span className="text-3xl">🏀</span>
              <p className="mt-1 text-[10px] font-bold text-brand">{team.founded || 2022}</p>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-brand"
        >
          {team.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl"
        >
          {firstName} {restName && <span className="text-gradient">{restName}</span>}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-3 text-2xl font-semibold text-white md:text-3xl"
        >
          {team.slogan}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mb-10 text-muted"
        >
          {team.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#players"
            className="rounded-full bg-brand px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
          >
            Meet the Team
          </a>
          <a
            href="#achievements"
            className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-brand hover:text-brand"
          >
            Palmarès
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 transition hover:text-brand"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
