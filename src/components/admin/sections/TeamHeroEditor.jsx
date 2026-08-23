import { useState } from "react"
import { Save, Sparkles, Check, Image as ImageIcon, Video } from "lucide-react"
import { useData } from "../../../context/DataContext"
import ImageInput from "../common/ImageInput"

export default function TeamHeroEditor({ onNotify }) {
  const { team, updateTeam } = useData()
  const [formData, setFormData] = useState({
    name: team.name || "",
    tagline: team.tagline || "",
    slogan: team.slogan || "",
    subtitle: team.subtitle || "",
    founded: team.founded || 2022,
    logo: team.logo || "",
    heroBg: team.heroBg || "/videos/hero-bg.mp4",
    heroPoster: team.heroPoster || "/images/hero-poster.jpg",
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTeam(formData)
    setSaved(true)
    if (onNotify) onNotify("Informations de l'équipe et du Hero enregistrées avec succès !")
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Équipe & Section Hero</h2>
          <p className="mt-1 text-xs text-muted">
            Modifiez le nom principal, le slogan, le logo et les médias d&apos;accueil.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark sm:self-auto"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          <span>{saved ? "Enregistré !" : "Enregistrer les modifications"}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Team Info */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Sparkles size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Informations Générales</h3>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Nom de l&apos;équipe
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="BAAMAKNA 3X3"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Tagline (au-dessus du titre)
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                placeholder="Keep Growing!"
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Année de fondation
              </label>
              <input
                type="number"
                value={formData.founded}
                onChange={(e) => handleChange("founded", parseInt(e.target.value) || 2022)}
                placeholder="2022"
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Slogan Principal
            </label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => handleChange("slogan", e.target.value)}
              placeholder="Play Fast. Win Together."
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Sous-titre / Description courte
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              placeholder="3x3 Morocco Tour · Basketball · Meknès"
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>
        </div>

        {/* Media & Logo Settings */}
        <div className="space-y-6 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <ImageIcon size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Logo & Médias du Hero</h3>
          </div>

          {/* Logo Input */}
          <ImageInput
            label="Logo de l'équipe"
            value={formData.logo}
            onChange={(val) => handleChange("logo", val)}
            placeholder="/images/logo.png ou collez un lien"
            helperText="Si aucun logo n'est fourni, l'icône par défaut sera affichée."
            aspectRatio="aspect-square"
            previewFit="object-contain"
          />

          <hr className="border-white/10" />

          {/* Video / Poster Inputs */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <Video size={14} className="text-brand" />
                <span>Vidéo d&apos;arrière-plan Hero (URL ou chemin)</span>
              </label>
              <input
                type="text"
                value={formData.heroBg}
                onChange={(e) => handleChange("heroBg", e.target.value)}
                placeholder="/videos/hero-bg.mp4"
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
              />
            </div>

            <ImageInput
              label="Image de remplacement / Poster vidéo"
              value={formData.heroPoster}
              onChange={(val) => handleChange("heroPoster", val)}
              placeholder="/images/hero-poster.jpg"
              aspectRatio="aspect-video"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
