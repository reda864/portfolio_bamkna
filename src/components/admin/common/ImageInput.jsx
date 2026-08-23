import { useState, useRef } from "react"
import { Upload, Link as LinkIcon, X, Image as ImageIcon, AlertCircle } from "lucide-react"
import { compressImageFile } from "../../../utils/imageUtils"

export default function ImageInput({
  label = "Image",
  value = "",
  onChange,
  placeholder = "https://... ou téléversez un fichier",
  helperText = "",
  aspectRatio = "aspect-square", // aspect-video, aspect-[4/5], aspect-square, etc.
  previewFit = "object-cover",
}) {
  const [mode, setMode] = useState(value && value.startsWith("data:") ? "upload" : "url")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setLoading(true)
    try {
      // Compress to prevent filling up localStorage (max 1000px, 80% quality)
      const compressedDataUrl = await compressImageFile(file, 1000, 1000, 0.82)
      onChange(compressedDataUrl)
    } catch (err) {
      console.error(err)
      setError("Impossible de charger cette image.")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    onChange("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-white/80">
          {label}
        </label>
        <div className="flex items-center gap-1 rounded-lg bg-surface-elevated p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-medium transition ${
              mode === "url" ? "bg-brand text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <LinkIcon size={12} />
            <span>Lien URL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-medium transition ${
              mode === "upload" ? "bg-brand text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <Upload size={12} />
            <span>Fichier</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {/* Preview Container */}
        <div
          className={`relative ${aspectRatio} w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-inner`}
        >
          {value ? (
            <>
              <img
                src={value}
                alt="Aperçu"
                className={`h-full w-full ${previewFit}`}
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
              <div className="hidden h-full w-full flex-col items-center justify-center bg-surface-elevated p-2 text-center text-[10px] text-muted">
                <AlertCircle size={18} className="mb-1 text-red-400" />
                Image invalide
              </div>
              <button
                type="button"
                onClick={handleClear}
                title="Supprimer l'image"
                className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white hover:bg-red-600 transition"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-muted">
              <ImageIcon size={22} className="mb-1 text-white/20" />
              <span className="text-[10px]">Aucune image</span>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="flex-1 space-y-2">
          {mode === "url" ? (
            <div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-surface-elevated px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-brand"
              />
              <p className="mt-1 text-[11px] text-muted">
                Entrez une URL directe (ex: <code className="text-white/60">/images/players/player-1.jpg</code> ou lien web).
              </p>
            </div>
          ) : (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={`file-upload-${label.replace(/\s+/g, "-")}`}
              />
              <label
                htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-surface-elevated/60 px-4 py-3 text-xs font-semibold text-white/80 transition hover:border-brand hover:bg-brand/5 hover:text-white"
              >
                <Upload size={16} className="text-brand" />
                <span>{loading ? "Optimisation..." : "Choisir une image depuis l'appareil"}</span>
              </label>
              <p className="mt-1 text-[11px] text-muted">
                JPG, PNG ou WebP. Compression automatique pour préserver la fluidité.
              </p>
            </div>
          )}

          {helperText && <p className="text-[11px] text-white/40">{helperText}</p>}
          {error && <p className="text-[11px] text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  )
}
