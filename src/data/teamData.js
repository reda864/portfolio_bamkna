export const team = {
  name: "BAAMAKNA 3X3",
  tagline: "Keep Growing!",
  slogan: "Play Fast. Win Together.",
  subtitle: "3x3 Morocco Tour · Basketball · Meknès",
  founded: 2022,
  instagram: "@baamakna3x3",
  email: "elmeliani.elmahdi@gmail.com",
  phone: ["06 01 55 45 49", "06 26 24 36 06", "06 49 66 51 63"],
  location: "Meknès, Maroc",
}

export const aboutText = {
  intro:
    "Notre équipe 3x3 représente le basketball marocain avec passion, ambition et détermination. Fondée en juin 2022 à Meknès, BAAMAKNA 3X3 s'est imposée comme l'une des équipes les plus actives et compétitives de la scène nationale.",
  mission:
    "Notre projet dépasse le cadre sportif. Nous souhaitons inspirer les jeunes, transmettre les valeurs du sport, du respect, de l'esprit d'équipe et de la persévérance, tout en contribuant au développement du basketball 3x3 au Maroc.",
  cities:
    "Taoujdate, Ifrane, Rabat, Salé, Mohammedia, Casablanca, Martil, Khouribga, Tanger, Agadir, Marrakech et Errachidia",
}

export const players = [
  {
    id: 1,
    name: "El Mahdi EL MELIANI",
    position: "Guard / Playmaker",
    height: "1.85 m",
    ppg: "12.4",
    threePt: "38%",
    instagram: "@baamakna3x3",
    photo: "/images/players/player-1.jpg",
  },
  {
    id: 2,
    name: "Mourad EL HADI",
    position: "Forward / Scorer",
    height: "1.90 m",
    ppg: "14.2",
    threePt: "42%",
    instagram: "@baamakna3x3",
    photo: "/images/players/player-2.jpg",
  },
  {
    id: 3,
    name: "Reda DANABA",
    position: "Forward / Defender",
    height: "1.88 m",
    ppg: "10.8",
    threePt: "35%",
    instagram: "@baamakna3x3",
    photo: "/images/players/player-3.jpg",
  },
  {
    id: 4,
    name: "Abdelhakim MEKNASSI",
    position: "Center / Rebounder",
    height: "1.95 m",
    ppg: "11.6",
    threePt: "28%",
    instagram: "@baamakna3x3",
    photo: "/images/players/player-4.jpg",
  },
]

export const stats = [
  { value: 2022, label: "Fondée en", suffix: "" },
  { value: 20, label: "Tournois", suffix: "+" },
  { value: 12, label: "Villes", suffix: "+" },
  { value: 4, label: "Joueurs", suffix: "" },
]

export const achievements = [
  { icon: "🥇", value: 3, label: "Titres 2025", suffix: "" },
  { icon: "🥈", value: 2, label: "Finales 2024", suffix: "" },
  { icon: "🏀", value: 20, label: "Tournois joués", suffix: "+" },
]

export const results = [
  { result: "🥇 1er", event: "3x3 ESM Michlifen — Ifrane", date: "Juil. 2025" },
  { result: "🥇 1er", event: "3x3 Élite Meknès — Meknès", date: "Mars 2026" },
  { result: "🥈 2ème", event: "Hay El Mohammadi 3x3 — Casablanca", date: "Mai 2024" },
  { result: "🥈 2ème", event: "3x3 ESM Michlifen — Ifrane", date: "Mars 2026" },
  { result: "🥉 3ème", event: "3x3 Taoujdate — Taoujdate", date: "Sept. 2024" },
  { result: "🥉 3ème", event: "Meknès 3x3 Vol.2 — Meknès", date: "Juil. 2025" },
  { result: "🥉 3ème", event: "Morocco Tour Quest — Agadir", date: "Août 2025" },
  { result: "🥇 1er", event: "3x3 Martil — Martil", date: "Août 2024" },
]

export const galleryItems = [
  { id: 1, type: "photo", title: "Victoire Martil 2024", image: "/images/gallery/gallery-1.jpg" },
  { id: 2, type: "photo", title: "Morocco Tour Quest", image: "/images/gallery/gallery-2.jpg" },
  { id: 3, type: "video", title: "Highlight Reel", image: "/images/gallery/gallery-3.jpg" },
  { id: 4, type: "photo", title: "Entraînement d'équipe", image: "/images/gallery/gallery-4.jpg" },
  { id: 5, type: "photo", title: "Célébration podium", image: "/images/gallery/gallery-5.jpg" },
  { id: 6, type: "photo", title: "Tournoi ESM Michlifen", image: "/images/gallery/gallery-6.jpg" },
]

export const tournaments = [
  { date: "15 Juin 2026", location: "Rabat", opponent: "Morocco Tour FRMBB — Stop 2" },
  { date: "20 Juil. 2026", location: "Ifrane", opponent: "3x3 ESM Michlifen" },
  { date: "05 Août 2026", location: "Tanger", opponent: "Morocco Tour Quest — Stop 1" },
  { date: "12 Août 2026", location: "Agadir", opponent: "Morocco Tour Quest — Stop 2" },
  { date: "25 Août 2026", location: "Casablanca", opponent: "3x3 Morocco Tour International" },
]

export const sponsors = [
  { name: "Nike", description: "Équipementier officiel", logo: "/images/sponsors/nike.png" },
  { name: "Wilson", description: "Ballons & équipement basketball", logo: "/images/sponsors/wilson.png" },
  { name: "Red Bull", description: "Énergie & performance", logo: "/images/sponsors/redbull.png" },
]

export const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Joueurs", href: "#players" },
  { label: "Palmarès", href: "#achievements" },
  { label: "Galerie", href: "#gallery" },
  { label: "Tournois", href: "#tournaments" },
  { label: "Contact", href: "#contact" },
]
