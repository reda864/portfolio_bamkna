import { useState } from "react"
import { Save, BookOpen, BarChart3, Plus, Trash2, Check } from "lucide-react"
import { useData } from "../../../context/DataContext"

export default function AboutStatsEditor({ onNotify }) {
  const { aboutText, stats, updateAbout, updateStats } = useData()

  const [aboutForm, setAboutForm] = useState({
    intro: aboutText.intro || "",
    mission: aboutText.mission || "",
    cities: aboutText.cities || "",
  })

  const [statsList, setStatsList] = useState(
    stats.map((s, idx) => ({ id: s.id || `stat-${idx}`, ...s }))
  )
  const [saved, setSaved] = useState(false)

  const handleStatChange = (index, field, value) => {
    const updated = [...statsList]
    updated[index] = {
      ...updated[index],
      [field]: field === "value" ? Number(value) || 0 : value,
    }
    setStatsList(updated)
    setSaved(false)
  }

  const handleAddStat = () => {
    setStatsList([
      ...statsList,
      { id: `stat-${Date.now()}`, value: 10, label: "Nouvelle Stat", suffix: "+" },
    ])
    setSaved(false)
  }

  const handleRemoveStat = (index) => {
    setStatsList(statsList.filter((_, i) => i !== index))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAbout(aboutForm)
    updateStats(statsList)
    setSaved(true)
    if (onNotify) onNotify("Section À propos et statistiques enregistrées !")
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">À Propos & Statistiques</h2>
          <p className="mt-1 text-xs text-muted">
            Modifiez l&apos;histoire de l&apos;équipe, les textes de mission et les compteurs de
            statistiques.
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Texts & Story */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <BookOpen size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Présentation & Mission</h3>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Citation d&apos;Introduction (Mise en avant)
            </label>
            <textarea
              rows={4}
              value={aboutForm.intro}
              onChange={(e) => setAboutForm({ ...aboutForm, intro: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Texte de Mission & Valeurs
            </label>
            <textarea
              rows={4}
              value={aboutForm.mission}
              onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Liste des villes visitées
            </label>
            <textarea
              rows={2}
              value={aboutForm.cities}
              onChange={(e) => setAboutForm({ ...aboutForm, cities: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-brand" />
              <h3 className="text-sm font-bold text-white">Compteurs Chiffrés (Animated Stats)</h3>
            </div>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center gap-1 rounded-lg bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              <Plus size={14} />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="space-y-3">
            {statsList.map((st, index) => (
              <div
                key={st.id || index}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-surface-elevated p-3.5"
              >
                <div className="w-24">
                  <label className="text-[10px] uppercase font-bold text-muted">Valeur</label>
                  <input
                    type="number"
                    value={st.value}
                    onChange={(e) => handleStatChange(index, "value", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-surface-card px-2.5 py-1.5 text-xs text-white outline-none focus:border-brand"
                  />
                </div>

                <div className="w-16">
                  <label className="text-[10px] uppercase font-bold text-muted">Suffixe</label>
                  <input
                    type="text"
                    value={st.suffix || ""}
                    placeholder="+"
                    onChange={(e) => handleStatChange(index, "suffix", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-surface-card px-2 py-1.5 text-xs text-white outline-none focus:border-brand text-center"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-muted">Libellé</label>
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => handleStatChange(index, "label", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-surface-card px-2.5 py-1.5 text-xs text-white outline-none focus:border-brand"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveStat(index)}
                  title="Supprimer ce compteur"
                  className="mt-4 rounded-lg p-2 text-white/40 transition hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
