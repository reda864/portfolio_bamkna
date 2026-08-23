import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, Sparkles } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function AdminLogin({ onBackToSite }) {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(username, password)
    } catch (err) {
      setError(err.message || "Erreur d'authentification.")
    } finally {
      setLoading(false)
    }
  }

  const fillDefaultCredentials = () => {
    setUsername("admin")
    setPassword("admin")
    setError("")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-12">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px]" />

      {/* Back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/10 bg-surface-card/80 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:border-brand/40 hover:text-white"
      >
        <ArrowLeft size={16} />
        <span>Retour au site</span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-card/90 p-8 shadow-2xl backdrop-blur-xl md:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/40 bg-brand/10 shadow-[0_0_30px_rgba(255,107,0,0.2)]">
              <ShieldCheck size={32} className="text-brand" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              BAAMAKNA <span className="text-gradient">3X3</span>
            </h1>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted">
              Espace d&apos;Administration
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-center text-xs font-medium text-red-300"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Nom d&apos;utilisateur
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-white/10 bg-surface-elevated pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Mot de passe
                </label>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-surface-elevated pl-10 pr-11 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Quick default credential hint pill */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand">
                <Sparkles size={14} />
                <span>Identifiants par défaut</span>
              </div>
              <p className="mt-1 text-xs text-white/60">
                Utilisateur: <span className="font-mono text-white">admin</span> · Mot de passe:{" "}
                <span className="font-mono text-white">admin</span>
              </p>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="mt-2.5 inline-block rounded-lg bg-white/10 px-3 py-1 text-[11px] font-medium text-white transition hover:bg-brand hover:text-white"
              >
                Remplir automatiquement
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
