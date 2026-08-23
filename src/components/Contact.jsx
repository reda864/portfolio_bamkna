import { motion } from "framer-motion"
import { AtSign, Mail, MapPin, Phone } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useData } from "../context/DataContext"

export default function Contact() {
  const { team } = useData()
  const phoneList = Array.isArray(team.phone) ? team.phone : [team.phone || "06 01 55 45 49"]
  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          emoji="📞"
          title="Contact"
          subtitle="Rejoignez-nous ou proposez un partenariat"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <ContactItem icon={MapPin} label="Adresse" value={team.location} />
            <ContactItem icon={Mail} label="Email" value={team.email} href={`mailto:${team.email}`} />
            {phoneList.map((num, idx) => (
              <ContactItem
                key={`${num}-${idx}`}
                icon={Phone}
                label={`Téléphone ${phoneList.length > 1 ? `#${idx + 1}` : ""}`}
                value={num}
                href={`tel:${num.replace(/\s/g, "")}`}
              />
            ))}
            <ContactItem
              icon={AtSign}
              label="Instagram"
              value={team.instagram}
              href={`https://instagram.com/${team.instagram.replace("@", "")}`}
            />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-surface-card p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <Field label="Nom" placeholder="Votre nom" />
              <Field label="Email" type="email" placeholder="votre@email.com" />
              <Field label="Message" placeholder="Votre message..." multiline />
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
              >
                Envoyer
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-surface-card p-5 transition hover:border-brand/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-1 font-medium text-white">{value}</p>
      </div>
    </div>
  )

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  )
}

function Field({ label, type = "text", placeholder, multiline }) {
  const classes =
    "mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand"

  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted">{label}</label>
      {multiline ? (
        <textarea rows={4} placeholder={placeholder} className={classes} />
      ) : (
        <input type={type} placeholder={placeholder} className={classes} />
      )}
    </div>
  )
}
