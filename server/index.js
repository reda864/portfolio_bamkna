import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import apiRoutes from "./routes/api.js"
import { initializeDatabase } from "./initDb.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// API Routes
app.use("/api", apiRoutes)

// Serve Static Frontend Assets (Vite build output)
const distPath = path.join(__dirname, "../dist")
app.use(express.static(distPath))

// Catch-all route to support React client-side routing
app.use((req, res) => {
  const indexPath = path.join(distPath, "index.html")
  res.sendFile(indexPath, (err) => {
    if (err) {
      // If dist/index.html does not exist yet (e.g. in dev before build)
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Baamakna 3x3 Backend</title></head>
          <body style="font-family:sans-serif;padding:40px;background:#111;color:#eee;">
            <h2>🏀 Baamakna 3X3 API Server is running!</h2>
            <p>API endpoints available at <a style="color:#ff6b00;" href="/api/health">/api/health</a> and <a style="color:#ff6b00;" href="/api/data">/api/data</a>.</p>
            <p>To serve the full frontend, run <code>npm run build</code> first.</p>
          </body>
        </html>
      `)
    }
  })
})

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Baamakna 3X3 Server running on port ${PORT}`)
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`)

  // Initialize DB tables
  await initializeDatabase()
})
