import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useData } from "../context/DataContext"

export default function Sponsors() {
  const { sponsors, partnership } = useData()

  return (
    <section id="sponsors" className="section-padding bg-surface-card/50">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          emoji="🤝"
          title="Sponsors"
          subtitle="Nos partenaires qui croient en nous"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id || sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-surface-card p-8 text-center transition hover:border-brand/40"
            >
              <div className="mb-6 flex h-20 w-full items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-16 max-w-[120px] object-contain opacity-80 grayscale transition group-hover:grayscale-0"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
                <div className="hidden h-16 w-16 items-center justify-center rounded-xl bg-surface-elevated">
                  <ImageIcon className="text-muted" size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{sponsor.name}</h3>
              <p className="mt-2 text-sm text-muted">{sponsor.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center"
        >
          <p className="text-lg font-semibold text-white">
            {partnership?.title || "Devenez partenaire"}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            {partnership?.description ||
              "Logo sur nos maillots, visibilité sur nos réseaux sociaux, présence aux tournois à travers le Maroc."}
          </p>
          <a
            href={partnership?.buttonHref || "#contact"}
            className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            {partnership?.buttonText || "Nous contacter"}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

