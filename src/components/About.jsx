import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import AnimatedCounter from "./AnimatedCounter"
import { useData } from "../context/DataContext"

export default function About() {
  const { aboutText, stats } = useData()
  return (
    <section id="about" className="section-padding bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          emoji="🔥"
          title="About Us"
          subtitle="Passion, ambition et esprit d'équipe"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="mb-6 border-l-4 border-brand pl-6 text-lg italic text-white/90 md:text-xl">
              &ldquo;{aboutText.intro}&rdquo;
            </blockquote>
            <p className="leading-relaxed text-white/60">{aboutText.mission}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-surface-card p-6 text-center transition hover:border-brand/40"
              >
                <p className="text-3xl font-bold text-brand md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-white/50"
        >
          Villes visitées : {aboutText.cities}
        </motion.p>
      </div>
    </section>
  )
}
