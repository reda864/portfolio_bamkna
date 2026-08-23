import {
  Users,
  Trophy,
  Image as ImageIcon,
  Calendar,
  Handshake,
  Sparkles,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
} from "lucide-react"
import { useData } from "../../../context/DataContext"

export default function DashboardOverview({ setActiveTab }) {
  const { team, players, results, galleryItems, tournaments, sponsors } = useData()

  const statsCards = [
    {
      title: "Joueurs enregistrés",
      value: players.length,
      icon: Users,
      tab: "players",
      desc: "Effectif complet de l'équipe",
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-400",
    },
    {
      title: "Palmarès & Trophées",
      value: results.length,
      icon: Trophy,
      tab: "achievements",
      desc: "Lignes de palmarès enregistrées",
      color: "from-amber-500/20 to-amber-600/5",
      iconColor: "text-amber-400",
    },
    {
      title: "Photos & Vidéos",
      value: galleryItems.length,
      icon: ImageIcon,
      tab: "gallery",
      desc: "Médias dans la galerie",
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-400",
    },
    {
      title: "Tournois programmés",
      value: tournaments.length,
      icon: Calendar,
      tab: "tournaments",
      desc: "Dates à venir sur le circuit",
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-400",
    },
    {
      title: "Partenaires / Sponsors",
      value: sponsors.length,
      icon: Handshake,
      tab: "sponsors",
      desc: "Marques et soutiens officiels",
      color: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-brand",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card p-6 md:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <Sparkles size={14} />
            <span>Tableau de bord interactif</span>
          </div>
          <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
            Gestion du portfolio <span className="text-gradient">{team.name}</span>
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Toutes les modifications apportées ici sont enregistrées immédiatement et visibles sur
            le site public. Vous pouvez modifier les textes, ajouter des photos, gérer les joueurs,
            le palmarès et plus encore.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-brand/15 blur-[80px]" />
      </div>

      {/* Overview Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className={`group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br ${card.color} p-5 transition hover:border-brand/50 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/60">{card.title}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                  <Icon size={18} className={card.iconColor} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-3xl font-black text-white">{card.value}</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
                  <span>Gérer</span>
                  <ArrowRight size={14} />
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{card.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions & Recent Snapshot */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <h3 className="flex items-center gap-2 text-base font-bold text-white">
            <PlusCircle size={18} className="text-brand" />
            <span>Actions rapides</span>
          </h3>
          <p className="mt-1 text-xs text-muted">Accédez directement aux formulaires d&apos;ajout</p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <button
              onClick={() => setActiveTab("players")}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-elevated p-3.5 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
            >
              <span className="flex items-center gap-2">
                <Users size={15} className="text-brand" />
                <span>Nouveau joueur</span>
              </span>
              <ArrowRight size={14} className="text-white/40" />
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-elevated p-3.5 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
            >
              <span className="flex items-center gap-2">
                <ImageIcon size={15} className="text-brand" />
                <span>Ajouter photo / vidéo</span>
              </span>
              <ArrowRight size={14} className="text-white/40" />
            </button>

            <button
              onClick={() => setActiveTab("achievements")}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-elevated p-3.5 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
            >
              <span className="flex items-center gap-2">
                <Trophy size={15} className="text-brand" />
                <span>Ajouter résultat</span>
              </span>
              <ArrowRight size={14} className="text-white/40" />
            </button>

            <button
              onClick={() => setActiveTab("tournaments")}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-elevated p-3.5 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
            >
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-brand" />
                <span>Ajouter tournoi</span>
              </span>
              <ArrowRight size={14} className="text-white/40" />
            </button>
          </div>
        </div>

        {/* Current Team Snapshot */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Aperçu de l&apos;équipe</span>
            </h3>
            <button
              onClick={() => setActiveTab("team-hero")}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Modifier
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-surface-elevated px-4 py-2.5 text-xs">
              <span className="text-muted">Nom de l&apos;équipe</span>
              <span className="font-bold text-white">{team.name}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-surface-elevated px-4 py-2.5 text-xs">
              <span className="text-muted">Slogan</span>
              <span className="font-medium text-white">{team.slogan}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-surface-elevated px-4 py-2.5 text-xs">
              <span className="text-muted">Tagline</span>
              <span className="font-medium text-brand">{team.tagline}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-surface-elevated px-4 py-2.5 text-xs">
              <span className="text-muted">Localisation & Fondation</span>
              <span className="font-medium text-white">
                {team.location} ({team.founded})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
