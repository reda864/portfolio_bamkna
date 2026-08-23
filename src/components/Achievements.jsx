import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import AnimatedCounter from "./AnimatedCounter"
import { useData } from "../context/DataContext"

export default function Achievements() {
  const { achievements, results } = useData()
  return (
    <section id="achievements" className="section-padding bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          emoji="🏆"
          title="Achievements"
          subtitle="Notre parcours sur les terrains du Maroc"
        />

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-brand/30 bg-gradient-to-br from-surface-card to-surface-elevated p-8 text-center"
            >
              <span className="text-4xl">{item.icon}</span>
              <p className="mt-4 text-4xl font-black text-brand md:text-5xl">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="px-6 py-4 font-semibold">Résultat</th>
                  <th className="px-6 py-4 font-semibold">Compétition</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr
                    key={`${row.event}-${row.date}`}
                    className={`border-t border-white/5 ${
                      i % 2 === 0 ? "bg-surface-card" : "bg-surface-elevated/50"
                    } transition hover:bg-brand/5`}
                  >
                    <td className="px-6 py-4 font-medium text-brand">{row.result}</td>
                    <td className="px-6 py-4 text-white/80">{row.event}</td>
                    <td className="px-6 py-4 text-muted">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
