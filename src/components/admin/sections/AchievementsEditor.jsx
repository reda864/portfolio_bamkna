import { useState } from "react"
import { Trophy, Plus, Edit2, Trash2, X, Check, Medal } from "lucide-react"
import { useData } from "../../../context/DataContext"

export default function AchievementsEditor({ onNotify }) {
  const { achievements, results, updateAchievements, addResult, editResult, deleteResult } =
    useData()

  // Highlight Cards State
  const [cards, setCards] = useState(achievements)
  const [cardsSaved, setCardsSaved] = useState(false)

  // Result Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingResultId, setEditingResultId] = useState(null)
  const [resultForm, setResultForm] = useState({
    result: "🥇 1er",
    event: "",
    date: "",
  })

  const handleCardChange = (index, field, value) => {
    const updated = [...cards]
    updated[index] = {
      ...updated[index],
      [field]: field === "value" ? Number(value) || 0 : value,
    }
    setCards(updated)
    setCardsSaved(false)
  }

  const handleSaveCards = () => {
    updateAchievements(cards)
    setCardsSaved(true)
    if (onNotify) onNotify("Cartes de palmarès enregistrées !")
    setTimeout(() => setCardsSaved(false), 3000)
  }

  const handleOpenAddResult = () => {
    setEditingResultId(null)
    setResultForm({ result: "🥇 1er", event: "", date: "2026" })
    setModalOpen(true)
  }

  const handleOpenEditResult = (res) => {
    setEditingResultId(res.id)
    setResultForm({
      result: res.result || "🥇 1er",
      event: res.event || "",
      date: res.date || "",
    })
    setModalOpen(true)
  }

  const handleDeleteResult = (id, event) => {
    if (window.confirm(`Supprimer la ligne "${event}" ?`)) {
      deleteResult(id)
      if (onNotify) onNotify("Ligne de palmarès supprimée.")
    }
  }

  const handleSubmitResult = (e) => {
    e.preventDefault()
    if (!resultForm.event.trim()) return

    if (editingResultId) {
      editResult(editingResultId, resultForm)
      if (onNotify) onNotify("Résultat mis à jour !")
    } else {
      addResult(resultForm)
      if (onNotify) onNotify("Nouveau résultat ajouté !")
    }
    setModalOpen(false)
  }

  const medalPresets = ["🥇 1er", "🥈 2ème", "🥉 3ème", "🏆 Vainqueur", "Top 4", "Participant"]

  return (
    <div className="space-y-10">
      {/* Top 3 Cards Editor */}
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <Trophy size={18} className="text-brand" />
              <span>Cartes Clés de Palmarès (Haut de page)</span>
            </h3>
            <p className="mt-0.5 text-xs text-muted">
              Les 3 grands chiffres mis en avant dans la section Palmarès.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveCards}
            className="flex items-center gap-1.5 self-start rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-dark sm:self-auto"
          >
            {cardsSaved ? <Check size={14} /> : <Trophy size={14} />}
            <span>{cardsSaved ? "Enregistré !" : "Enregistrer les cartes"}</span>
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="rounded-xl border border-white/5 bg-surface-elevated p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand">Carte #{idx + 1}</span>
                <input
                  type="text"
                  value={card.icon}
                  onChange={(e) => handleCardChange(idx, "icon", e.target.value)}
                  className="w-12 rounded-lg border border-white/10 bg-surface-card py-1 text-center text-lg outline-none focus:border-brand"
                  placeholder="🥇"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium uppercase text-muted">Nombre</label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="number"
                    value={card.value}
                    onChange={(e) => handleCardChange(idx, "value", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-surface-card px-3 py-1.5 text-xs text-white outline-none focus:border-brand font-bold"
                  />
                  <input
                    type="text"
                    value={card.suffix || ""}
                    placeholder="+"
                    onChange={(e) => handleCardChange(idx, "suffix", e.target.value)}
                    className="w-12 rounded-lg border border-white/10 bg-surface-card py-1.5 text-center text-xs text-white outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium uppercase text-muted">Libellé</label>
                <input
                  type="text"
                  value={card.label}
                  onChange={(e) => handleCardChange(idx, "label", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-surface-card px-3 py-1.5 text-xs text-white outline-none focus:border-brand"
                  placeholder="Titres 2025"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Results Editor */}
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <Medal size={18} className="text-brand" />
              <span>Tableau des Résultats et Compétitions</span>
            </h3>
            <p className="mt-0.5 text-xs text-muted">
              Historique complet des tournois disputés et des médailles remportées.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddResult}
            className="flex items-center gap-1.5 self-start rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark sm:self-auto"
          >
            <Plus size={15} />
            <span>Ajouter une ligne de résultat</span>
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th className="pb-3 font-semibold uppercase tracking-wider">Résultat / Médaille</th>
                <th className="pb-3 font-semibold uppercase tracking-wider">Compétition / Ville</th>
                <th className="pb-3 font-semibold uppercase tracking-wider">Date</th>
                <th className="pb-3 text-right font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((res) => (
                <tr key={res.id} className="transition hover:bg-white/5">
                  <td className="py-3 font-bold text-brand">{res.result}</td>
                  <td className="py-3 font-medium text-white">{res.event}</td>
                  <td className="py-3 text-muted">{res.date}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditResult(res)}
                        className="rounded-lg p-1.5 text-muted transition hover:bg-brand/10 hover:text-brand"
                        title="Modifier"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteResult(res.id, res.event)}
                        className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/10 hover:text-red-400"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Result */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-surface-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingResultId ? "Modifier le résultat" : "Ajouter une ligne au palmarès"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitResult} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Résultat / Médaille
                </label>
                <div className="mt-2 flex flex-wrap gap-1.5 mb-2">
                  {medalPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setResultForm({ ...resultForm, result: preset })}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                        resultForm.result === preset
                          ? "bg-brand text-white"
                          : "bg-surface-elevated text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={resultForm.result}
                  onChange={(e) => setResultForm({ ...resultForm, result: e.target.value })}
                  placeholder="🥇 1er"
                  required
                  className="w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Nom du Tournoi & Lieu
                </label>
                <input
                  type="text"
                  value={resultForm.event}
                  onChange={(e) => setResultForm({ ...resultForm, event: e.target.value })}
                  placeholder="3x3 ESM Michlifen — Ifrane"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Date / Période
                </label>
                <input
                  type="text"
                  value={resultForm.date}
                  onChange={(e) => setResultForm({ ...resultForm, date: e.target.value })}
                  placeholder="Juil. 2025"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/5"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-white hover:bg-brand-dark"
                >
                  <Check size={16} />
                  <span>Enregistrer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
