import { motion } from "framer-motion"
import { AtSign, Ruler, Target, TrendingUp, User } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useData } from "../context/DataContext"

function PlayerCard({ player, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-card transition hover:border-brand/50 hover:shadow-[0_0_40px_rgba(255,107,0,0.1)]"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
        <img
          src={player.photo}
          alt={player.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none"
            e.target.nextSibling.style.display = "flex"
          }}
        />
        <div className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-surface-elevated to-surface-card">
          <User size={48} className="mb-2 text-brand/50" />
          <span className="text-xs text-muted">Joueur #{index + 1}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-card to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
          #{index + 1}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white">{player.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{player.position}</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-surface-elevated p-3 text-center">
            <Ruler size={14} className="mx-auto mb-1 text-muted" />
            <p className="text-xs text-muted">Height</p>
            <p className="text-sm font-semibold">{player.height}</p>
          </div>
          <div className="rounded-lg bg-surface-elevated p-3 text-center">
            <TrendingUp size={14} className="mx-auto mb-1 text-muted" />
            <p className="text-xs text-muted">PPG</p>
            <p className="text-sm font-semibold">{player.ppg}</p>
          </div>
          <div className="rounded-lg bg-surface-elevated p-3 text-center">
            <Target size={14} className="mx-auto mb-1 text-muted" />
            <p className="text-xs text-muted">3PT%</p>
            <p className="text-sm font-semibold">{player.threePt}</p>
          </div>
        </div>

        <a
          href={`https://instagram.com/${(player.instagram || "").replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-2 text-sm text-white/60 transition hover:text-brand"
        >
          <AtSign size={16} />
          {player.instagram}
        </a>
      </div>
    </motion.article>
  )
}

export default function Players() {
  const { players } = useData()
  return (
    <section id="players" className="section-padding bg-surface-card/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          emoji="👥"
          title="Players"
          subtitle={`${players.length} joueurs, une seule ambition — gagner ensemble`}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((player, i) => (
            <PlayerCard key={player.id} player={player} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
