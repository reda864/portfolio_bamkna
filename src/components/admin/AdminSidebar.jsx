import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Users,
  Trophy,
  Image as ImageIcon,
  Calendar,
  Handshake,
  PhoneCall,
  Settings,
} from "lucide-react"

export const ADMIN_TABS = [
  { id: "overview", label: "Tableau de bord", icon: LayoutDashboard, badge: null },
  { id: "team-hero", label: "Équipe & Hero", icon: Sparkles, badge: null },
  { id: "about-stats", label: "À propos & Chiffres", icon: BookOpen, badge: null },
  { id: "players", label: "Joueurs & Effectif", icon: Users, countKey: "players" },
  { id: "achievements", label: "Palmarès & Trophées", icon: Trophy, countKey: "results" },
  { id: "gallery", label: "Galerie & Médias", icon: ImageIcon, countKey: "galleryItems" },
  { id: "tournaments", label: "Tournois à venir", icon: Calendar, countKey: "tournaments" },
  { id: "sponsors", label: "Sponsors & Partenaires", icon: Handshake, countKey: "sponsors" },
  { id: "contact", label: "Contact & Coordonnées", icon: PhoneCall, badge: null },
  { id: "settings", label: "Paramètres & Données", icon: Settings, badge: null },
]

export default function AdminSidebar({ activeTab, setActiveTab, counts, onCloseMobile }) {
  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between border-r border-white/10 bg-surface-card/60 p-4 lg:bg-transparent">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          Gestion du Portfolio
        </div>

        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const count = tab.countKey && counts ? counts[tab.countKey] : null

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                if (onCloseMobile) onCloseMobile()
              }}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-brand text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={17}
                  className={isActive ? "text-white" : "text-brand/80 group-hover:text-brand"}
                />
                <span>{tab.label}</span>
              </div>

              {count !== null && count !== undefined && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-black/30 text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer info */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-surface-elevated/40 p-4 text-center">
        <p className="text-[11px] font-semibold text-white/80">BAAMAKNA 3X3 CMS</p>
        <p className="mt-1 text-[10px] text-muted">Modifications enregistrées en direct</p>
      </div>
    </aside>
  )
}
