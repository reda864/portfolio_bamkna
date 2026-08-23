import { useState } from "react"
import { Handshake, Plus, Edit2, Trash2, X, Check, Save, Image as ImageIcon } from "lucide-react"
import { useData } from "../../../context/DataContext"
import ImageInput from "../common/ImageInput"

export default function SponsorsEditor({ onNotify }) {
  const { sponsors, partnership, updateSponsors, updatePartnership, addSponsor, editSponsor, deleteSponsor } =
    useData()

  // Partnership CTA Banner State
  const [ctaForm, setCtaForm] = useState({
    title: partnership?.title || "Devenez partenaire",
    description:
      partnership?.description ||
      "Logo sur nos maillots, visibilité sur nos réseaux sociaux, présence aux tournois à travers le Maroc.",
    buttonText: partnership?.buttonText || "Nous contacter",
  })
  const [ctaSaved, setCtaSaved] = useState(false)

  // Sponsor Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const initialSponsorForm = {
    name: "",
    description: "Partenaire officiel",
    logo: "/images/sponsors/nike.png",
  }
  const [formData, setFormData] = useState(initialSponsorForm)

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData(initialSponsorForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (s) => {
    setEditingId(s.id)
    setFormData({
      name: s.name || "",
      description: s.description || "",
      logo: s.logo || "",
    })
    setModalOpen(true)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Supprimer le partenaire "${name}" ?`)) {
      deleteSponsor(id)
      if (onNotify) onNotify(`Partenaire "${name}" supprimé.`)
    }
  }

  const handleSubmitSponsor = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    if (editingId) {
      editSponsor(editingId, formData)
      if (onNotify) onNotify(`Partenaire "${formData.name}" mis à jour !`)
    } else {
      addSponsor(formData)
      if (onNotify) onNotify(`Nouveau partenaire "${formData.name}" ajouté !`)
    }
    setModalOpen(false)
  }

  const handleSaveCta = (e) => {
    e.preventDefault()
    updatePartnership(ctaForm)
    setCtaSaved(true)
    if (onNotify) onNotify("Bannière d'appel aux partenaires enregistrée !")
    setTimeout(() => setCtaSaved(false), 3000)
  }

  return (
    <div className="space-y-10">
      {/* Sponsors Cards List */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Sponsors & Partenaires</h2>
            <p className="mt-1 text-xs text-muted">
              Gérez les logos et descriptifs des partenaires officiels de l&apos;équipe.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark sm:self-auto"
          >
            <Plus size={16} />
            <span>Ajouter un sponsor</span>
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface-card p-6 transition hover:border-brand/40"
            >
              {/* Logo Area */}
              <div className="flex h-24 w-full items-center justify-center rounded-xl bg-surface-elevated p-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
                <div className="hidden flex-col items-center justify-center text-muted">
                  <ImageIcon size={24} className="mb-1" />
                  <span className="text-[10px]">Logo</span>
                </div>
              </div>

              {/* Info Area */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-white">{sponsor.name}</h3>
                <p className="mt-1 text-xs text-muted">{sponsor.description}</p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(sponsor)}
                  className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  <Edit2 size={13} />
                  <span>Modifier</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(sponsor.id, sponsor.name)}
                  className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/10 hover:text-red-400"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership CTA Banner Settings */}
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Handshake size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Bannière &quot;Devenez Partenaire&quot;</h3>
          </div>

          <button
            type="button"
            onClick={handleSaveCta}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-dark"
          >
            {ctaSaved ? <Check size={14} /> : <Save size={14} />}
            <span>{ctaSaved ? "Enregistré !" : "Enregistrer la bannière"}</span>
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Titre de l&apos;encadré
            </label>
            <input
              type="text"
              value={ctaForm.title}
              onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Texte du bouton CTA
            </label>
            <input
              type="text"
              value={ctaForm.buttonText}
              onChange={(e) => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Description de l&apos;opportunité de partenariat
            </label>
            <textarea
              rows={3}
              value={ctaForm.description}
              onChange={(e) => setCtaForm({ ...ctaForm, description: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* Modal Add / Edit Sponsor */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-surface-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Modifier le partenaire" : "Ajouter un partenaire"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitSponsor} className="mt-6 space-y-5">
              <ImageInput
                label="Logo du sponsor"
                value={formData.logo}
                onChange={(val) => setFormData({ ...formData, logo: val })}
                aspectRatio="aspect-video"
                previewFit="object-contain"
                placeholder="/images/sponsors/nike.png"
                helperText="Format PNG transparent recommandé."
              />

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Nom de la marque / partenaire
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nike"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Description / Rôle
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Équipementier officiel"
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
