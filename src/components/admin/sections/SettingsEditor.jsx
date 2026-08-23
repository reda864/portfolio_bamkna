import { useState, useRef } from "react"
import {
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react"
import { useAuth } from "../../../context/AuthContext"
import { useData } from "../../../context/DataContext"

export default function SettingsEditor({ onNotify }) {
  const { changePassword } = useAuth()
  const { exportDataJSON, importDataJSON, resetToDefaultData } = useData()

  // Password state
  const [currentPwd, setCurrentPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [pwdError, setPwdError] = useState("")
  const [pwdSuccess, setPwdSuccess] = useState("")
  const [pwdLoading, setPwdLoading] = useState(false)

  // JSON Import state
  const fileInputRef = useRef(null)
  const [importStatus, setImportStatus] = useState("")

  const handleChangePassword = (e) => {
    e.preventDefault()
    setPwdError("")
    setPwdSuccess("")

    if (newPwd !== confirmPwd) {
      setPwdError("Le nouveau mot de passe et sa confirmation ne correspondent pas.")
      return
    }

    setPwdLoading(true)
    try {
      changePassword(currentPwd, newPwd)
      setPwdSuccess("Mot de passe modifié avec succès !")
      setCurrentPwd("")
      setNewPwd("")
      setConfirmPwd("")
      if (onNotify) onNotify("Mot de passe administrateur mis à jour !")
    } catch (err) {
      setPwdError(err.message || "Erreur lors du changement de mot de passe.")
    } finally {
      setPwdLoading(false)
    }
  }

  const handleFileImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target.result
        importDataJSON(content)
        setImportStatus("Données importées avec succès !")
        if (onNotify) onNotify("Sauvegarde JSON restaurée avec succès !")
        if (fileInputRef.current) fileInputRef.current.value = ""
      } catch (err) {
        setImportStatus("Erreur : Fichier JSON invalide.")
      }
    }
    reader.readAsText(file)
  }

  const handleResetFactory = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut ? Vos modifications non sauvegardées seront effacées."
      )
    ) {
      resetToDefaultData()
      if (onNotify) onNotify("Données réinitialisées aux valeurs par défaut !")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">Paramètres & Données</h2>
        <p className="mt-1 text-xs text-muted">
          Sécurité du compte, sauvegarde complète du site et restauration des données.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Change Password Card */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <KeyRound size={18} className="text-brand" />
            <h3 className="text-sm font-bold text-white">Changer le mot de passe Admin</h3>
          </div>

          <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
            {pwdError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                {pwdSuccess}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-2.5 text-xs text-white outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              disabled={pwdLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark disabled:opacity-50"
            >
              <Lock size={14} />
              <span>{pwdLoading ? "Enregistrement..." : "Mettre à jour le mot de passe"}</span>
            </button>
          </form>
        </div>

        {/* Backup & Restore Card */}
        <div className="space-y-6">
          {/* Export / Import */}
          <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <ShieldCheck size={18} className="text-brand" />
              <h3 className="text-sm font-bold text-white">Sauvegarde & Restauration (JSON)</h3>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-xs text-muted">
                Téléchargez une archive JSON de l&apos;intégralité de votre site pour la conserver,
                ou restaurez un fichier précédemment sauvegardé.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={exportDataJSON}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface-elevated py-3 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
                >
                  <Download size={16} className="text-brand" />
                  <span>Exporter Backup JSON</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                  id="json-file-input"
                />
                <label
                  htmlFor="json-file-input"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface-elevated py-3 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5"
                >
                  <Upload size={16} className="text-brand" />
                  <span>Importer Fichier JSON</span>
                </label>
              </div>

              {importStatus && (
                <p className="text-center text-xs font-medium text-emerald-400">{importStatus}</p>
              )}
            </div>
          </div>

          {/* Reset to Factory Defaults */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <h3 className="text-sm font-bold">Zone Dangereuse : Réinitialisation</h3>
            </div>
            <p className="mt-2 text-xs text-white/60">
              Cette action réinitialise tout le contenu du portfolio (joueurs, textes, photos,
              palmarès) aux données d&apos;origine du projet.
            </p>

            <button
              type="button"
              onClick={handleResetFactory}
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <RotateCcw size={14} />
              <span>Réinitialiser aux valeurs d&apos;origine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
