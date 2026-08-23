import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import AdminLogin from "../components/admin/AdminLogin"
import AdminNavbar from "../components/admin/AdminNavbar"
import AdminSidebar from "../components/admin/AdminSidebar"

// Section Editors
import DashboardOverview from "../components/admin/sections/DashboardOverview"
import TeamHeroEditor from "../components/admin/sections/TeamHeroEditor"
import AboutStatsEditor from "../components/admin/sections/AboutStatsEditor"
import PlayersEditor from "../components/admin/sections/PlayersEditor"
import AchievementsEditor from "../components/admin/sections/AchievementsEditor"
import GalleryEditor from "../components/admin/sections/GalleryEditor"
import TournamentsEditor from "../components/admin/sections/TournamentsEditor"
import SponsorsEditor from "../components/admin/sections/SponsorsEditor"
import ContactEditor from "../components/admin/sections/ContactEditor"
import SettingsEditor from "../components/admin/sections/SettingsEditor"

export default function AdminPage({ onBackToSite }) {
  const { isAuthenticated, loading } = useAuth()
  const { players, results, galleryItems, tournaments, sponsors } = useData()

  const [activeTab, setActiveTab] = useState("overview")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [notification, setNotification] = useState("")

  const triggerNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification("")
    }, 4000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onBackToSite={onBackToSite} />
  }

  const counts = {
    players: players.length,
    results: results.length,
    galleryItems: galleryItems.length,
    tournaments: tournaments.length,
    sponsors: sponsors.length,
  }

  const renderActiveSection = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview setActiveTab={setActiveTab} />
      case "team-hero":
        return <TeamHeroEditor onNotify={triggerNotification} />
      case "about-stats":
        return <AboutStatsEditor onNotify={triggerNotification} />
      case "players":
        return <PlayersEditor onNotify={triggerNotification} />
      case "achievements":
        return <AchievementsEditor onNotify={triggerNotification} />
      case "gallery":
        return <GalleryEditor onNotify={triggerNotification} />
      case "tournaments":
        return <TournamentsEditor onNotify={triggerNotification} />
      case "sponsors":
        return <SponsorsEditor onNotify={triggerNotification} />
      case "contact":
        return <ContactEditor onNotify={triggerNotification} />
      case "settings":
        return <SettingsEditor onNotify={triggerNotification} />
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-surface text-white flex flex-col font-sans">
      {/* Top Admin Header */}
      <AdminNavbar
        onBackToSite={onBackToSite}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Main Admin Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />
        </div>

        {/* Mobile Drawer Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              {/* Backdrop */}
              <div
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />
              {/* Drawer Content */}
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative z-10 w-64 bg-surface-card"
              >
                <AdminSidebar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  counts={counts}
                  onCloseMobile={() => setMobileSidebarOpen(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveSection()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-emerald-500/40 bg-surface-card/95 px-5 py-3 shadow-2xl backdrop-blur-xl"
          >
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-medium text-white">{notification}</span>
            <button
              onClick={() => setNotification("")}
              className="ml-2 text-white/40 hover:text-white"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
