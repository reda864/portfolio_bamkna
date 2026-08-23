import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)
const SESSION_KEY = "baamakna_admin_session"
const PWD_KEY = "baamakna_admin_pwd"
const DEFAULT_PASSWORD = "admin"
const DEFAULT_USERNAME = "admin"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize and check saved session
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY)
      if (savedSession) {
        const parsed = JSON.parse(savedSession)
        if (parsed && parsed.username) {
          setUser({ username: parsed.username, loggedInAt: parsed.loggedInAt })
        }
      }
    } catch (e) {
      console.error("Error reading auth session", e)
      localStorage.removeItem(SESSION_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  const getStoredPassword = () => {
    return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD
  }

  const login = async (username, password) => {
    // Artificial small delay for realistic UX
    await new Promise((res) => setTimeout(res, 300))

    const currentPwd = getStoredPassword()
    const cleanUser = (username || "").trim().toLowerCase()

    if (cleanUser === DEFAULT_USERNAME && password === currentPwd) {
      const sessionData = {
        username: "Admin",
        loggedInAt: new Date().toISOString(),
        token: "tok_" + Math.random().toString(36).substring(2) + Date.now(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
      setUser({ username: sessionData.username, loggedInAt: sessionData.loggedInAt })
      return { success: true }
    } else {
      throw new Error("Nom d'utilisateur ou mot de passe incorrect.")
    }
  }

  const changePassword = (currentPassword, newPassword) => {
    const currentStored = getStoredPassword()
    if (currentPassword !== currentStored) {
      throw new Error("L'ancien mot de passe est incorrect.")
    }
    if (!newPassword || newPassword.length < 4) {
      throw new Error("Le nouveau mot de passe doit comporter au moins 4 caractères.")
    }
    localStorage.setItem(PWD_KEY, newPassword)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
