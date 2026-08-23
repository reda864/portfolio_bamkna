import { useState } from "react"
import { PhoneCall, MapPin, Mail, Phone, AtSign, Plus, Trash2, Save, Check } from "lucide-react"
import { useData } from "../../../context/DataContext"

export default function ContactEditor({ onNotify }) {
  const { team, updateTeam } = useData()
  const [formData, setFormData] = useState({
    location: team.location || "Meknès, Maroc",
    email: team.email || "elmeliani.elmahdi@gmail.com",
    instagram: team.instagram || "@baamakna3x3",
    phone: Array.isArray(team.phone) ? [...team.phone] : [team.phone || "06 01 55 45 49"],
  })
  const [saved, setSaved] = useState(false)

  const handlePhoneChange = (index, val) => {
    const updated = [...formData.phone]
    updated[index] = val
    setFormData({ ...formData, phone: updated })
    setSaved(false)
  }

  const handleAddPhone = () => {
    setFormData({ ...formData, phone: [...formData.phone, ""] })
    setSaved(false)
  }

  const handleRemovePhone = (index) => {
    setFormData({ ...formData, phone: formData.phone.filter((_, i) => i !== index) })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTeam({
      location: formData.location,
      email: formData.email,
      instagram: formData.instagram,
      phone: formData.phone.filter((p) => p.trim() !== ""),
    })
    setSaved(true)
    if (onNotify) onNotify("Coordonnées de contact mises à jour avec succès !")
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Contact & Coordonnées</h2>
          <p className="mt-1 text-xs text-muted">
            Modifiez l&apos;adresse, les adresses email, les numéros de téléphone et le compte
            Instagram.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] transition hover:bg-brand-dark sm:self-auto"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          <span>{saved ? "Enregistré !" : "Enregistrer les coordonnées"}</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Contacts */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <MapPin size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Localisation & Réseaux</h3>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <MapPin size={14} className="text-brand" />
              <span>Adresse / Ville & Pays</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value })
                setSaved(false)
              }}
              placeholder="Meknès, Maroc"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <Mail size={14} className="text-brand" />
              <span>Adresse Email officielle</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setSaved(false)
              }}
              placeholder="elmeliani.elmahdi@gmail.com"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <AtSign size={14} className="text-brand" />
              <span>Compte Instagram officiel</span>
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => {
                setFormData({ ...formData, instagram: e.target.value })
                setSaved(false)
              }}
              placeholder="@baamakna3x3"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white outline-none focus:border-brand"
            />
          </div>
        </div>

        {/* Phone numbers manager */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-brand" />
              <h3 className="text-sm font-bold text-white">Numéros de Téléphone</h3>
            </div>
            <button
              type="button"
              onClick={handleAddPhone}
              className="flex items-center gap-1 rounded-lg bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand hover:bg-brand hover:text-white transition"
            >
              <Plus size={14} />
              <span>Ajouter un numéro</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.phone.map((num, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={num}
                  onChange={(e) => handlePhoneChange(idx, e.target.value)}
                  placeholder="06 01 55 45 49"
                  className="w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
                />
                {formData.phone.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePhone(idx)}
                    className="rounded-xl p-2.5 text-muted transition hover:bg-red-500/10 hover:text-red-400"
                    title="Supprimer ce numéro"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted">
            Ces numéros sont cliquables directement sur mobile pour lancer des appels directs.
          </p>
        </div>
      </div>
    </form>
  )
}
