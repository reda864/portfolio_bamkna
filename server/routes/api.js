import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { query, getPool } from "../db.js"
import { defaultTeamData } from "../defaultData.js"

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || "baamakna_secret_jwt_key_2026"

// Authentication Middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Accès non autorisé : Jeton manquant." })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: "Session expirée ou invalide. Veuillez vous reconnecter." })
  }
}

// --------------------------------------------------------------------------
// 1. Healthcheck
// --------------------------------------------------------------------------
router.get("/health", async (req, res) => {
  let dbStatus = "disconnected"
  let errorMsg = null

  if (getPool()) {
    try {
      const result = await query("SELECT NOW() as current_time, count(*) as count FROM portfolio_data")
      dbStatus = "connected"
      return res.json({
        status: "ok",
        uptime: process.uptime(),
        database: {
          status: dbStatus,
          provider: "Neon PostgreSQL",
          time: result.rows[0]?.current_time,
          hasData: Number(result.rows[0]?.count) > 0,
        },
        timestamp: new Date().toISOString(),
      })
    } catch (e) {
      errorMsg = e.message
    }
  }

  return res.json({
    status: "ok",
    uptime: process.uptime(),
    database: {
      status: dbStatus,
      error: errorMsg || "No pool initialized",
    },
    timestamp: new Date().toISOString(),
  })
})

// --------------------------------------------------------------------------
// 2. Portfolio Data Endpoints
// --------------------------------------------------------------------------

// GET /api/data - Public
router.get("/data", async (req, res) => {
  try {
    if (!getPool()) {
      return res.json(defaultTeamData)
    }

    const result = await query("SELECT data FROM portfolio_data WHERE id = $1", ["main"])
    if (result.rows.length > 0 && result.rows[0].data) {
      return res.json(result.rows[0].data)
    }

    // If no row exists yet, return default data
    return res.json(defaultTeamData)
  } catch (err) {
    console.error("Error retrieving portfolio data from PostgreSQL:", err)
    // Fallback to default data in case of error so site never crashes
    return res.json(defaultTeamData)
  }
})

// PUT /api/data - Admin Only
router.put("/data", authMiddleware, async (req, res) => {
  try {
    const portfolioData = req.body
    if (!portfolioData || typeof portfolioData !== "object") {
      return res.status(400).json({ error: "Données de portfolio invalides." })
    }

    if (!getPool()) {
      return res.status(503).json({ error: "Base de données PostgreSQL non configurée." })
    }

    await query(
      `
      INSERT INTO portfolio_data (id, data, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP
    `,
      ["main", JSON.stringify(portfolioData)]
    )

    return res.json({
      success: true,
      message: "Données sauvegardées avec succès dans PostgreSQL.",
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error("Error saving portfolio data to PostgreSQL:", err)
    return res.status(500).json({ error: "Erreur lors de l'enregistrement dans la base de données." })
  }
})

// POST /api/data/reset - Admin Only (Reset to initial default data)
router.post("/data/reset", authMiddleware, async (req, res) => {
  try {
    if (!getPool()) {
      return res.status(503).json({ error: "Base de données PostgreSQL non configurée." })
    }

    await query(
      `
      INSERT INTO portfolio_data (id, data, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP
    `,
      ["main", JSON.stringify(defaultTeamData)]
    )

    return res.json({
      success: true,
      data: defaultTeamData,
      message: "Données réinitialisées aux valeurs par défaut.",
    })
  } catch (err) {
    console.error("Error resetting portfolio data:", err)
    return res.status(500).json({ error: "Erreur lors de la réinitialisation." })
  }
})

// --------------------------------------------------------------------------
// 3. Admin Authentication Endpoints
// --------------------------------------------------------------------------

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: "Veuillez fournir un nom d'utilisateur et un mot de passe." })
    }

    const cleanUser = username.trim().toLowerCase()

    if (!getPool()) {
      // Fallback dev check if DB is not configured
      const defaultUser = (process.env.ADMIN_USERNAME || "admin").toLowerCase()
      const defaultPass = process.env.ADMIN_PASSWORD || "admin"
      if (cleanUser === defaultUser && password === defaultPass) {
        const token = jwt.sign({ username: "Admin" }, JWT_SECRET, { expiresIn: "7d" })
        return res.json({
          success: true,
          token,
          user: { username: "Admin" },
        })
      }
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect." })
    }

    const result = await query("SELECT id, username, password_hash FROM admin_users WHERE LOWER(username) = $1", [
      cleanUser,
    ])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect." })
    }

    const admin = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, admin.password_hash)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect." })
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: "7d",
    })

    return res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    return res.status(500).json({ error: "Erreur serveur lors de la connexion." })
  }
})

// GET /api/auth/me - Validate current session
router.get("/auth/me", authMiddleware, async (req, res) => {
  return res.json({
    valid: true,
    user: req.user,
  })
})

// PUT /api/auth/change-password - Admin Only
router.put("/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Tous les champs sont requis." })
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ error: "Le mot de passe doit comporter au moins 4 caractères." })
    }

    if (!getPool()) {
      return res.status(503).json({ error: "Base de données non configurée." })
    }

    const username = (req.user?.username || "admin").toLowerCase()
    const result = await query(
      "SELECT id, password_hash FROM admin_users WHERE LOWER(username) = $1",
      [username]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur administrateur introuvable." })
    }

    const admin = result.rows[0]
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash)

    if (!isMatch) {
      return res.status(400).json({ error: "L'ancien mot de passe est incorrect." })
    }

    const salt = await bcrypt.genSalt(10)
    const newHash = await bcrypt.hash(newPassword, salt)

    await query(
      "UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [newHash, admin.id]
    )

    return res.json({
      success: true,
      message: "Mot de passe mis à jour avec succès !",
    })
  } catch (err) {
    console.error("Change password error:", err)
    return res.status(500).json({ error: "Erreur lors du changement de mot de passe." })
  }
})

// --------------------------------------------------------------------------
// 4. Contact Form Messages Endpoints
// --------------------------------------------------------------------------

// POST /api/contact - Public
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Le message ne peut pas être vide." })
    }

    if (getPool()) {
      await query(
        "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
        [(name || "").trim(), (email || "").trim(), message.trim()]
      )
    }

    return res.json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
    })
  } catch (err) {
    console.error("Contact submission error:", err)
    return res.status(500).json({ error: "Impossible d'envoyer le message pour le moment." })
  }
})

// GET /api/contact - Admin Only
router.get("/contact", authMiddleware, async (req, res) => {
  try {
    if (!getPool()) {
      return res.json([])
    }

    const result = await query(
      "SELECT id, name, email, message, is_read, created_at FROM contact_messages ORDER BY created_at DESC"
    )
    return res.json(result.rows)
  } catch (err) {
    console.error("Fetch contact messages error:", err)
    return res.status(500).json({ error: "Erreur lors de la récupération des messages." })
  }
})

export default router
