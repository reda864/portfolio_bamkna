import { useState, useEffect } from "react"
import { AuthProvider } from "./context/AuthContext"
import { DataProvider } from "./context/DataContext"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Players from "./components/Players"
import Achievements from "./components/Achievements"
import Gallery from "./components/Gallery"
import Tournaments from "./components/Tournaments"
import Sponsors from "./components/Sponsors"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import AdminPage from "./pages/AdminPage"
import AdminQuickBar from "./components/admin/AdminQuickBar"

function PortfolioApp() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash === "#admin" || window.location.pathname.startsWith("/admin")
        ? "admin"
        : "portfolio"
    }
    return "portfolio"
  })

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin" || window.location.pathname.startsWith("/admin")) {
        setCurrentView("admin")
      } else if (window.location.hash === "#hero" || window.location.hash === "" || !window.location.hash.startsWith("#admin")) {
        // If switching back from admin via URL
        if (currentView === "admin" && window.location.hash !== "#admin") {
          setCurrentView("portfolio")
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [currentView])

  const goToAdmin = () => {
    window.location.hash = "admin"
    setCurrentView("admin")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToPortfolio = () => {
    window.location.hash = "hero"
    setCurrentView("portfolio")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (currentView === "admin") {
    return <AdminPage onBackToSite={goToPortfolio} />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Players />
        <Achievements />
        <Gallery />
        <Tournaments />
        <Sponsors />
        <Contact />
      </main>
      <Footer onOpenAdmin={goToAdmin} />
      <AdminQuickBar onOpenAdmin={goToAdmin} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PortfolioApp />
      </DataProvider>
    </AuthProvider>
  )
}
