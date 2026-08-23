import { motion } from "framer-motion"
import { Calendar, MapPin, Swords } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useData } from "../context/DataContext"

export default function Tournaments() {
  const { tournaments } = useData()
  return (
    <section id="tournaments" className="section-padding bg-surface">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          emoji="📅"
          title="Upcoming Tournaments"
          subtitle="Prochaines dates sur le circuit 3x3"
        />

        <div className="space-y-4">
          {tournaments.map((t, i) => (
            <motion.div
              key={`${t.date}-${t.location}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface-card p-6 transition hover:border-brand/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="font-bold text-white">{t.date}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} />
                    {t.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/5 pt-4 sm:border-t-0 sm:pt-0">
                <Swords size={16} className="shrink-0 text-brand" />
                <p className="text-sm text-white/70">{t.opponent}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
