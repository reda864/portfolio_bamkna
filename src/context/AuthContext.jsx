import { createContext, useContext, useState, useEffect } from "react"
import { loginAdmin, checkAuthStatus, changeAdminPassword, logoutAdmin, getToken } from "../api/client"

const AuthContext = createContext(null)
const SESSION_KEY = "baamakna_admin_session"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize and check saved session & backend JWT
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken()
        if (token) {
          const authStatus = await checkAuthStatus()
          if (authStatus.valid && authStatus.user) {
            setUser({ username: authStatus.user.username || "Admin" })
          } else {
            // Fallback to local session check
            const savedSession = localStorage.getItem(SESSION_KEY)
            if (savedSession) {
              const parsed = JSON.parse(savedSession)
              if (parsed?.username) {
                setUser({ username: parsed.username })
              }
            }
          }
        } else {
          const savedSession = localStorage.getItem(SESSION_KEY)
          if (savedSession) {
            const parsed = JSON.parse(savedSession)
            if (parsed?.username) {
              setUser({ username: parsed.username })
            }
          }
        }
      } catch (e) {
        console.error("Error reading auth session", e)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await loginAdmin(username, password)
      const userData = {
        username: response.user?.username || "Admin",
        loggedInAt: new Date().toISOString(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      // If server is unreachable in offline/local mock mode
      const cleanUser = (username || "").trim().toLowerCase()
      const fallbackPwd = localStorage.getItem("baamakna_admin_pwd") || "admin"
      if (cleanUser === "admin" && password === fallbackPwd) {
        const userData = {
          username: "Admin",
          loggedInAt: new Date().toISOString(),
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      throw new Error(err.message || "Nom d'utilisateur ou mot de passe incorrect.")
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await changeAdminPassword(currentPassword, newPassword)
      localStorage.setItem("baamakna_admin_pwd", newPassword)
      return { success: true }
    } catch (err) {
      // Local fallback
      const currentStored = localStorage.getItem("baamakna_admin_pwd") || "admin"
      if (currentPassword === currentStored) {
        if (!newPassword || newPassword.length < 4) {
          throw new Error("Le nouveau mot de passe doit comporter au moins 4 caractères.")
        }
        localStorage.setItem("baamakna_admin_pwd", newPassword)
        return { success: true }
      }
      throw new Error(err.message || "L'ancien mot de passe est incorrect.")
    }
  }

  const logout = () => {
    logoutAdmin()
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
