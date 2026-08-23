import bcrypt from "bcryptjs"
import { query, getPool } from "./db.js"
import { defaultTeamData } from "./defaultData.js"

export const initializeDatabase = async () => {
  if (!getPool()) {
    console.warn("⚠️ Skipping database initialization: No database connection pool configured.")
    return false
  }

  try {
    console.log("🔄 Initializing PostgreSQL database tables...")

    // 1. Create portfolio_data table
    await query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 2. Create admin_users table
    await query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 3. Create contact_messages table
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 4. Seed initial portfolio data if not present
    const dataCheck = await query("SELECT id FROM portfolio_data WHERE id = $1", ["main"])
    if (dataCheck.rowCount === 0) {
      console.log("🌱 Seeding default portfolio data to Neon PostgreSQL...")
      await query(
        "INSERT INTO portfolio_data (id, data, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
        ["main", JSON.stringify(defaultTeamData)]
      )
    }

    // 5. Seed default admin user if no admin exists
    const adminCheck = await query("SELECT id FROM admin_users LIMIT 1")
    if (adminCheck.rowCount === 0) {
      const defaultUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase()
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin"
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(defaultPassword, salt)

      console.log(`🌱 Seeding default admin user ('${defaultUsername}') to database...`)
      await query(
        "INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)",
        [defaultUsername, hashedPassword]
      )
    }

    console.log("✅ PostgreSQL tables and seed data ready.")
    return true
  } catch (err) {
    console.error("❌ Error initializing PostgreSQL database:", err)
    return false
  }
}

export default initializeDatabase
