const API_BASE = "/api"
const TOKEN_KEY = "baamakna_jwt_token"

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (e) {
    return null
  }
}

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  } catch (e) {
    console.error("Failed to store token", e)
  }
}

const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  }
  if (includeAuth) {
    const token = getToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }
  return headers
}

// --------------------------------------------------------------------------
// Portfolio Data API
// --------------------------------------------------------------------------

export const fetchPortfolioData = async () => {
  const res = await fetch(`${API_BASE}/data`)
  if (!res.ok) {
    throw new Error(`Erreur lors du chargement des données (${res.status})`)
  }
  return await res.json()
}

export const savePortfolioData = async (data) => {
  const res = await fetch(`${API_BASE}/data`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || `Erreur lors de la sauvegarde (${res.status})`)
  }

  return await res.json()
}

export const resetPortfolioData = async () => {
  const res = await fetch(`${API_BASE}/data/reset`, {
    method: "POST",
    headers: getHeaders(true),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || `Erreur lors de la réinitialisation (${res.status})`)
  }

  return await res.json()
}

// --------------------------------------------------------------------------
// Auth API
// --------------------------------------------------------------------------

export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "Nom d'utilisateur ou mot de passe incorrect.")
  }

  if (data.token) {
    setToken(data.token)
  }

  return data
}

export const checkAuthStatus = async () => {
  const token = getToken()
  if (!token) return { valid: false }

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true),
    })
    if (!res.ok) {
      setToken(null)
      return { valid: false }
    }
    const data = await res.json()
    return { valid: true, user: data.user }
  } catch (e) {
    // If backend is unreachable, check local session
    return { valid: false }
  }
}

export const changeAdminPassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify({ currentPassword, newPassword }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "Erreur lors de la modification du mot de passe.")
  }

  return data
}

export const logoutAdmin = () => {
  setToken(null)
}

// --------------------------------------------------------------------------
// Contact Form API
// --------------------------------------------------------------------------

export const sendContactMessage = async (name, email, message) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ name, email, message }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "Erreur lors de l'envoi du message.")
  }

  return data
}

export const fetchContactMessages = async () => {
  const res = await fetch(`${API_BASE}/contact`, {
    headers: getHeaders(true),
  })

  if (!res.ok) {
    throw new Error("Impossible de récupérer les messages de contact.")
  }

  return await res.json()
}
