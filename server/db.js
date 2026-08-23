import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const connectionString = process.env.DATABASE_URL

let pool = null

if (connectionString) {
  const isNeon = connectionString.includes("neon.tech")
  const hasSslMode = connectionString.includes("sslmode=require")
  const isProd = process.env.NODE_ENV === "production"

  pool = new Pool({
    connectionString,
    ssl: isNeon || hasSslMode || isProd ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

  pool.on("error", (err) => {
    console.error("Unexpected error on idle PostgreSQL client", err)
  })
} else {
  console.warn(
    "⚠️ DATABASE_URL is not defined in environment variables. Database operations will fail unless DATABASE_URL is set."
  )
}

export const query = async (text, params) => {
  if (!pool) {
    throw new Error(
      "PostgreSQL pool is not initialized. Please set DATABASE_URL in your environment variables (.env)."
    )
  }
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  if (process.env.NODE_ENV !== "production") {
    console.log("Executed query", { text, duration, rows: res.rowCount })
  }
  return res
}

export const getPool = () => pool

export default {
  query,
  getPool,
}
