import { useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Edit3, LogOut, ChevronDown, ChevronUp } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function AdminQuickBar({ onOpenAdmin }) {
  const { isAuthenticated, logout } = useAuth()
  const [minimized, setMinimized] = useState(false)

  if (!isAuthenticated) return null

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <div className="flex items-center gap-2 rounded-full border border-brand/40 bg-surface-card/95 p-1.5 shadow-2xl backdrop-blur-xl">
        {!minimized && (
          <div className="flex items-center gap-2 pl-3 pr-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-white hidden sm:inline">Admin Connecté</span>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(255,107,0,0.4)] transition hover:bg-brand-dark"
            >
              <Edit3 size={13} />
              <span>Gérer le site</span>
            </button>

            <button
              type="button"
              onClick={logout}
              title="Déconnexion"
              className="flex items-center gap-1 rounded-full bg-surface-elevated p-1.5 text-white/70 transition hover:bg-red-500/20 hover:text-red-400"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMinimized(!minimized)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-elevated text-white/70 hover:text-white transition"
          title={minimized ? "Agrandir le menu Admin" : "Réduire"}
        >
          {minimized ? <ShieldCheck size={14} className="text-brand" /> : <ChevronDown size={14} />}
        </button>
      </div>
    </motion.div>
  )
}
