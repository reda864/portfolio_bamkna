import { useState } from "react"
import { Image as ImageIcon, Plus, Edit2, Trash2, X, Check, Play, Film } from "lucide-react"
import { useData } from "../../../context/DataContext"
import ImageInput from "../common/ImageInput"

export default function GalleryEditor({ onNotify }) {
  const { galleryItems, addGalleryItem, editGalleryItem, deleteGalleryItem } = useData()
  const [filter, setFilter] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)

  const initialForm = {
    title: "",
    type: "photo",
    image: "/images/gallery/gallery-1.jpg",
  }

  const [formData, setFormData] = useState(initialForm)

  const filteredItems = galleryItems.filter((item) => {
    if (filter === "all") return true
    return item.type === filter
  })

  const handleOpenAdd = () => {
    setEditingItemId(null)
    setFormData(initialForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItemId(item.id)
    setFormData({
      title: item.title || "",
      type: item.type || "photo",
      image: item.image || "",
    })
    setModalOpen(true)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Supprimer l'élément de galerie "${title}" ?`)) {
      deleteGalleryItem(id)
      if (onNotify) onNotify(`Élément "${title}" supprimé.`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    if (editingItemId) {
      editGalleryItem(editingItemId, formData)
      if (onNotify) onNotify(`Média "${formData.title}" mis à jour !`)
    } else {
      addGalleryItem(formData)
      if (onNotify) onNotify(`Nouveau média "${formData.title}" ajouté !`)
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Galerie & Médias</h2>
          <p className="mt-1 text-xs text-muted">
            Ajoutez des photos de compétition et des vidéos highlights pour le carrousel et la
            grille.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex rounded-xl bg-surface-elevated p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                filter === "all" ? "bg-brand text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Tous ({galleryItems.length})
            </button>
            <button
              onClick={() => setFilter("photo")}
              className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                filter === "photo" ? "bg-brand text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setFilter("video")}
              className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                filter === "video" ? "bg-brand text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Vidéos
            </button>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Ajouter un média</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card transition hover:border-brand/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
              <div className="hidden h-full w-full flex-col items-center justify-center bg-surface-elevated text-xs text-muted">
                <ImageIcon size={32} className="mb-1 text-white/30" />
                <span>Image non trouvée</span>
              </div>

              {/* Type Badge */}
              <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {item.type === "video" ? (
                  <>
                    <Play size={10} className="text-brand fill-brand" /> Vidéo
                  </>
                ) : (
                  <>
                    <ImageIcon size={10} className="text-brand" /> Photo
                  </>
                )}
              </span>

              {/* Hover Actions */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 transition sm:opacity-0 sm:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="rounded-lg bg-black/70 p-2 text-white hover:bg-brand transition"
                  title="Modifier"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="rounded-lg bg-black/70 p-2 text-white hover:bg-red-600 transition"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="font-bold text-white text-sm">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Media */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-surface-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingItemId ? "Modifier le média" : "Ajouter un média à la galerie"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Type Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Type de média
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "photo" })}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                      formData.type === "photo"
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-white/10 bg-surface-elevated text-white/60 hover:text-white"
                    }`}
                  >
                    <ImageIcon size={16} />
                    <span>Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "video" })}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                      formData.type === "video"
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-white/10 bg-surface-elevated text-white/60 hover:text-white"
                    }`}
                  >
                    <Film size={16} />
                    <span>Vidéo / Highlight</span>
                  </button>
                </div>
              </div>

              {/* Media Image / Thumbnail Input */}
              <ImageInput
                label={formData.type === "video" ? "Miniature / Image de couverture" : "Photo"}
                value={formData.image}
                onChange={(val) => setFormData({ ...formData, image: val })}
                aspectRatio="aspect-[4/3]"
                placeholder="/images/gallery/gallery-1.jpg"
                helperText="Format 4:3 ou 16:9 recommandé."
              />

              {/* Title / Caption */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Titre / Légende
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Victoire Martil 2024"
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
                  <span>{editingItemId ? "Enregistrer" : "Ajouter à la galerie"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
