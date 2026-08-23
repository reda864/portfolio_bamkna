import { useState } from "react"
import { Calendar, MapPin, Swords, Plus, Edit2, Trash2, X, Check } from "lucide-react"
import { useData } from "../../../context/DataContext"

export default function TournamentsEditor({ onNotify }) {
  const { tournaments, addTournament, editTournament, deleteTournament } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const initialForm = {
    date: "15 Juin 2026",
    location: "Rabat",
    opponent: "Morocco Tour FRMBB — Stop 2",
  }

  const [formData, setFormData] = useState(initialForm)

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData(initialForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (t) => {
    setEditingId(t.id)
    setFormData({
      date: t.date || "",
      location: t.location || "",
      opponent: t.opponent || "",
    })
    setModalOpen(true)
  }

  const handleDelete = (id, opponent) => {
    if (window.confirm(`Supprimer le tournoi "${opponent}" ?`)) {
      deleteTournament(id)
      if (onNotify) onNotify("Tournoi supprimé du calendrier.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.opponent.trim()) return

    if (editingId) {
      editTournament(editingId, formData)
      if (onNotify) onNotify("Tournoi mis à jour !")
    } else {
      addTournament(formData)
      if (onNotify) onNotify("Nouveau tournoi programmé !")
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Tournois à Venir</h2>
          <p className="mt-1 text-xs text-muted">
            Gérez le calendrier des prochaines étapes et compétitions 3x3.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark sm:self-auto"
        >
          <Plus size={16} />
          <span>Ajouter une date</span>
        </button>
      </div>

      {/* Tournaments List */}
      <div className="space-y-3">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="group flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-surface-card p-5 transition hover:border-brand/40 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t.date}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={13} className="text-brand/80" />
                  <span>{t.location}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-white/5 pt-3 sm:border-t-0 sm:pt-0">
              <Swords size={15} className="shrink-0 text-brand" />
              <span className="text-xs font-medium text-white/80">{t.opponent}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(t)}
                className="flex items-center gap-1 rounded-lg bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-brand hover:text-white"
              >
                <Edit2 size={13} />
                <span>Modifier</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(t.id, t.opponent)}
                className="rounded-lg bg-surface-elevated p-1.5 text-white/50 transition hover:bg-red-500/20 hover:text-red-400"
                title="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Tournament */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Modifier la date" : "Programmer un nouveau tournoi"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Date du tournoi
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="15 Juin 2026"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Ville / Lieu
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Rabat"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Nom du Tournoi / Adversaire
                </label>
                <input
                  type="text"
                  value={formData.opponent}
                  onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                  placeholder="Morocco Tour FRMBB — Stop 2"
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
