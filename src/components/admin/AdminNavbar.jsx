import { Globe, Download, LogOut, Menu, X, Shield, Sparkles } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

export default function AdminNavbar({ onBackToSite, mobileSidebarOpen, setMobileSidebarOpen }) {
  const { logout, user } = useAuth()
  const { exportDataJSON, team } = useData()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface-card/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile trigger & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="rounded-xl border border-white/10 p-2 text-white/70 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-bold text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              🏀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-tight text-white sm:text-base">
                  {team.name || "BAAMAKNA 3X3"}
                </h1>
                <span className="hidden rounded-md bg-brand/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand sm:inline-block">
                  CMS Admin
                </span>
              </div>
              <p className="text-[11px] text-muted flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Synchronisation locale active</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={exportDataJSON}
            title="Télécharger une sauvegarde JSON"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 bg-surface-elevated px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:border-brand/40 hover:text-brand"
          >
            <Download size={15} />
            <span>Sauvegarder JSON</span>
          </button>

          <button
            type="button"
            onClick={onBackToSite}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark"
          >
            <Globe size={15} />
            <span>Voir le site</span>
          </button>

          <button
            type="button"
            onClick={logout}
            title="Se déconnecter"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-surface-elevated p-2 text-xs font-medium text-white/70 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 sm:px-3 sm:py-2"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  )
}
