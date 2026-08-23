import { Lock } from "lucide-react"
import { useData } from "../context/DataContext"

export default function Footer({ onOpenAdmin }) {
  const { team } = useData()

  return (
    <footer className="border-t border-white/10 bg-surface-card px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-brand">{team.name}</p>
          <p className="mt-1 text-sm text-muted">
            {team.slogan} — {team.tagline}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {team.name}. Tous droits réservés.
          </p>

          <button
            type="button"
            onClick={onOpenAdmin || (() => { window.location.hash = "admin" })}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-elevated px-3 py-1 text-[11px] font-medium text-white/50 transition hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
          >
            <Lock size={11} />
            <span>Espace Admin</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

