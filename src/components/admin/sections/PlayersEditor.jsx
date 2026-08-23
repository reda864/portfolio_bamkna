import { useState } from "react"
import { Users, Plus, Edit2, Trash2, X, Check, AtSign, Ruler, TrendingUp, Target } from "lucide-react"
import { useData } from "../../../context/DataContext"
import ImageInput from "../common/ImageInput"

export default function PlayersEditor({ onNotify }) {
  const { players, addPlayer, editPlayer, deletePlayer } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlayerId, setEditingPlayerId] = useState(null)

  const initialForm = {
    name: "",
    position: "Guard / Playmaker",
    height: "1.85 m",
    ppg: "12.0",
    threePt: "35%",
    instagram: "@baamakna3x3",
    photo: "/images/players/player-1.jpg",
  }

  const [formData, setFormData] = useState(initialForm)

  const handleOpenAdd = () => {
    setEditingPlayerId(null)
    setFormData(initialForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (player) => {
    setEditingPlayerId(player.id)
    setFormData({
      name: player.name || "",
      position: player.position || "",
      height: player.height || "",
      ppg: player.ppg || "",
      threePt: player.threePt || "",
      instagram: player.instagram || "@baamakna3x3",
      photo: player.photo || "",
    })
    setModalOpen(true)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le joueur "${name}" ?`)) {
      deletePlayer(id)
      if (onNotify) onNotify(`Joueur "${name}" supprimé.`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    if (editingPlayerId) {
      editPlayer(editingPlayerId, formData)
      if (onNotify) onNotify(`Joueur "${formData.name}" mis à jour !`)
    } else {
      addPlayer(formData)
      if (onNotify) onNotify(`Joueur "${formData.name}" ajouté avec succès !`)
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Joueurs & Effectif</h2>
          <p className="mt-1 text-xs text-muted">
            Gérez les fiches des joueurs, leurs photos, postes et statistiques clés.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark sm:self-auto"
        >
          <Plus size={16} />
          <span>Ajouter un joueur</span>
        </button>
      </div>

      {/* Players Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface-card transition hover:border-brand/40 hover:shadow-xl"
          >
            {/* Top Photo & Badge */}
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
              <div className="hidden h-full w-full flex-col items-center justify-center bg-surface-elevated text-center text-xs text-muted">
                <Users size={32} className="mb-1 text-brand/50" />
                <span>Photo non trouvée</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-card to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white">
                #{index + 1}
              </span>

              {/* Action buttons on hover */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 transition sm:opacity-0 sm:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(player)}
                  title="Modifier le joueur"
                  className="rounded-lg bg-black/70 p-2 text-white hover:bg-brand transition"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(player.id, player.name)}
                  title="Supprimer le joueur"
                  className="rounded-lg bg-black/70 p-2 text-white hover:bg-red-600 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Info Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="text-base font-bold text-white">{player.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-brand">{player.position}</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-surface-elevated p-2">
                    <p className="text-[10px] text-muted">Taille</p>
                    <p className="mt-0.5 font-semibold text-white">{player.height}</p>
                  </div>
                  <div className="rounded-lg bg-surface-elevated p-2">
                    <p className="text-[10px] text-muted">PPG</p>
                    <p className="mt-0.5 font-semibold text-white">{player.ppg}</p>
                  </div>
                  <div className="rounded-lg bg-surface-elevated p-2">
                    <p className="text-[10px] text-muted">3PT%</p>
                    <p className="mt-0.5 font-semibold text-white">{player.threePt}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <AtSign size={13} />
                  <span>{player.instagram}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(player)}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Player */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-surface-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingPlayerId ? "Modifier le joueur" : "Ajouter un nouveau joueur"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Photo Input */}
              <ImageInput
                label="Photo du joueur"
                value={formData.photo}
                onChange={(val) => setFormData({ ...formData, photo: val })}
                aspectRatio="aspect-[4/5]"
                placeholder="/images/players/player-1.jpg"
                helperText="Format portrait recommandé (ex: 4:5 ou carré)."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="El Mahdi EL MELIANI"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Poste sur le terrain
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Guard / Playmaker"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    Taille
                  </label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="1.85 m"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 py-2 text-xs text-white outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    Points/Match (PPG)
                  </label>
                  <input
                    type="text"
                    value={formData.ppg}
                    onChange={(e) => setFormData({ ...formData, ppg: e.target.value })}
                    placeholder="12.4"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 py-2 text-xs text-white outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    3PT%
                  </label>
                  <input
                    type="text"
                    value={formData.threePt}
                    onChange={(e) => setFormData({ ...formData, threePt: e.target.value })}
                    placeholder="38%"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 py-2 text-xs text-white outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@baamakna3x3"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-brand"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark"
                >
                  <Check size={16} />
                  <span>{editingPlayerId ? "Enregistrer" : "Ajouter le joueur"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
