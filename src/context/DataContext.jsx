import { createContext, useContext, useState, useEffect } from "react"
import * as defaultTeamData from "../data/teamData"

const DataContext = createContext(null)
const DATA_STORAGE_KEY = "baamakna_portfolio_data_v1"

// Format default results and other lists to ensure every item has an id
const getInitialDefaultData = () => {
  return {
    team: {
      ...defaultTeamData.team,
      logo: "", // Custom logo URL or base64 if uploaded
      heroBg: "/videos/hero-bg.mp4",
      heroPoster: "/images/hero-poster.jpg",
    },
    aboutText: {
      ...defaultTeamData.aboutText,
    },
    stats: defaultTeamData.stats.map((s, index) => ({ id: `stat-${index + 1}`, ...s })),
    players: defaultTeamData.players.map((p, index) => ({ id: p.id || index + 1, ...p })),
    achievements: defaultTeamData.achievements.map((a, index) => ({ id: `ach-${index + 1}`, ...a })),
    results: defaultTeamData.results.map((r, index) => ({ id: `res-${index + 1}`, ...r })),
    galleryItems: defaultTeamData.galleryItems.map((g, index) => ({ id: g.id || index + 1, ...g })),
    tournaments: defaultTeamData.tournaments.map((t, index) => ({ id: `tour-${index + 1}`, ...t })),
    sponsors: defaultTeamData.sponsors.map((s, index) => ({ id: `spon-${index + 1}`, ...s })),
    partnership: {
      title: "Devenez partenaire",
      description:
        "Logo sur nos maillots, visibilité sur nos réseaux sociaux, présence aux tournois à travers le Maroc.",
      buttonText: "Nous contacter",
      buttonHref: "#contact",
    },
    navLinks: defaultTeamData.navLinks || [],
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(DATA_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge with initial defaults to ensure any missing fields exist
        const initial = getInitialDefaultData()
        return {
          ...initial,
          ...parsed,
          team: { ...initial.team, ...(parsed.team || {}) },
          aboutText: { ...initial.aboutText, ...(parsed.aboutText || {}) },
          partnership: { ...initial.partnership, ...(parsed.partnership || {}) },
        }
      }
    } catch (e) {
      console.error("Failed to parse stored portfolio data", e)
    }
    return getInitialDefaultData()
  })

  // Sync to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error("Failed to save portfolio data to localStorage", e)
    }
  }, [data])

  // --- Specific Update Handlers ---

  const updateTeam = (teamUpdates) => {
    setData((prev) => ({
      ...prev,
      team: { ...prev.team, ...teamUpdates },
    }))
  }

  const updateAbout = (aboutUpdates) => {
    setData((prev) => ({
      ...prev,
      aboutText: { ...prev.aboutText, ...aboutUpdates },
    }))
  }

  const updateStats = (newStats) => {
    setData((prev) => ({ ...prev, stats: newStats }))
  }

  const updatePartnership = (partnershipUpdates) => {
    setData((prev) => ({
      ...prev,
      partnership: { ...prev.partnership, ...partnershipUpdates },
    }))
  }

  // --- Players Handlers ---
  const updatePlayers = (newPlayers) => {
    setData((prev) => ({ ...prev, players: newPlayers }))
  }

  const addPlayer = (player) => {
    const newId = Date.now()
    const newPlayerObj = {
      id: newId,
      name: player.name || "Nouveau Joueur",
      position: player.position || "Guard",
      height: player.height || "1.85 m",
      ppg: player.ppg || "10.0",
      threePt: player.threePt || "35%",
      instagram: player.instagram || "@baamakna3x3",
      photo: player.photo || "/images/players/player-1.jpg",
      ...player,
    }
    setData((prev) => ({ ...prev, players: [...prev.players, newPlayerObj] }))
    return newPlayerObj
  }

  const editPlayer = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    }))
  }

  const deletePlayer = (id) => {
    setData((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }))
  }

  // --- Achievements Handlers ---
  const updateAchievements = (newAchievements) => {
    setData((prev) => ({ ...prev, achievements: newAchievements }))
  }

  const editAchievement = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...updatedFields } : a)),
    }))
  }

  // --- Results (Palmarès Table) Handlers ---
  const updateResults = (newResults) => {
    setData((prev) => ({ ...prev, results: newResults }))
  }

  const addResult = (resultItem) => {
    const newItem = {
      id: `res-${Date.now()}`,
      result: resultItem.result || "🥇 1er",
      event: resultItem.event || "Nouveau Tournoi",
      date: resultItem.date || "2026",
      ...resultItem,
    }
    setData((prev) => ({ ...prev, results: [newItem, ...prev.results] }))
    return newItem
  }

  const editResult = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      results: prev.results.map((r) => (r.id === id ? { ...r, ...updatedFields } : r)),
    }))
  }

  const deleteResult = (id) => {
    setData((prev) => ({
      ...prev,
      results: prev.results.filter((r) => r.id !== id),
    }))
  }

  // --- Gallery Handlers ---
  const updateGallery = (newGallery) => {
    setData((prev) => ({ ...prev, galleryItems: newGallery }))
  }

  const addGalleryItem = (item) => {
    const newItem = {
      id: Date.now(),
      type: item.type || "photo",
      title: item.title || "Photo du match",
      image: item.image || "/images/gallery/gallery-1.jpg",
      ...item,
    }
    setData((prev) => ({ ...prev, galleryItems: [newItem, ...prev.galleryItems] }))
    return newItem
  }

  const editGalleryItem = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)),
    }))
  }

  const deleteGalleryItem = (id) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((g) => g.id !== id),
    }))
  }

  // --- Tournaments Handlers ---
  const updateTournaments = (newTournaments) => {
    setData((prev) => ({ ...prev, tournaments: newTournaments }))
  }

  const addTournament = (item) => {
    const newItem = {
      id: `tour-${Date.now()}`,
      date: item.date || "15 Juin 2026",
      location: item.location || "Meknès",
      opponent: item.opponent || "Morocco Tour FRMBB",
      ...item,
    }
    setData((prev) => ({ ...prev, tournaments: [...prev.tournaments, newItem] }))
    return newItem
  }

  const editTournament = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      tournaments: prev.tournaments.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    }))
  }

  const deleteTournament = (id) => {
    setData((prev) => ({
      ...prev,
      tournaments: prev.tournaments.filter((t) => t.id !== id),
    }))
  }

  // --- Sponsors Handlers ---
  const updateSponsors = (newSponsors) => {
    setData((prev) => ({ ...prev, sponsors: newSponsors }))
  }

  const addSponsor = (item) => {
    const newItem = {
      id: `spon-${Date.now()}`,
      name: item.name || "Nouveau Partenaire",
      description: item.description || "Partenaire officiel",
      logo: item.logo || "/images/sponsors/nike.png",
      ...item,
    }
    setData((prev) => ({ ...prev, sponsors: [...prev.sponsors, newItem] }))
    return newItem
  }

  const editSponsor = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      sponsors: prev.sponsors.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)),
    }))
  }

  const deleteSponsor = (id) => {
    setData((prev) => ({
      ...prev,
      sponsors: prev.sponsors.filter((s) => s.id !== id),
    }))
  }

  // --- Export / Import / Reset ---
  const exportDataJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", jsonString)
    downloadAnchor.setAttribute(
      "download",
      `baamakna_backup_${new Date().toISOString().slice(0, 10)}.json`
    )
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importDataJSON = (jsonContent) => {
    try {
      const parsed = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent
      if (!parsed.team || !parsed.players) {
        throw new Error("Format JSON invalide pour le portfolio Baamakna.")
      }
      setData(parsed)
      return { success: true }
    } catch (err) {
      console.error(err)
      throw new Error(err.message || "Erreur lors de l'importation du fichier JSON.")
    }
  }

  const resetToDefaultData = () => {
    localStorage.removeItem(DATA_STORAGE_KEY)
    const defaults = getInitialDefaultData()
    setData(defaults)
  }

  return (
    <DataContext.Provider
      value={{
        data,
        team: data.team,
        aboutText: data.aboutText,
        stats: data.stats,
        players: data.players,
        achievements: data.achievements,
        results: data.results,
        galleryItems: data.galleryItems,
        tournaments: data.tournaments,
        sponsors: data.sponsors,
        partnership: data.partnership,
        navLinks: data.navLinks,
        updateTeam,
        updateAbout,
        updateStats,
        updatePartnership,
        updatePlayers,
        addPlayer,
        editPlayer,
        deletePlayer,
        updateAchievements,
        editAchievement,
        updateResults,
        addResult,
        editResult,
        deleteResult,
        updateGallery,
        addGalleryItem,
        editGalleryItem,
        deleteGalleryItem,
        updateTournaments,
        addTournament,
        editTournament,
        deleteTournament,
        updateSponsors,
        addSponsor,
        editSponsor,
        deleteSponsor,
        exportDataJSON,
        importDataJSON,
        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
