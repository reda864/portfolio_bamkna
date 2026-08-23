import { motion } from "framer-motion"

export default function SectionHeading({ emoji, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-14 text-center"
    >
      {emoji && <span className="mb-3 block text-3xl">{emoji}</span>}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>
      )}
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brand" />
    </motion.div>
  )
}
