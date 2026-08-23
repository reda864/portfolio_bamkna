import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { ImageIcon, Play } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useData } from "../context/DataContext"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

function GalleryItem({ item }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-elevated">
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.style.display = "none"
          e.target.nextSibling.style.display = "flex"
        }}
      />
      <div className="absolute inset-0 hidden flex-col items-center justify-center bg-surface-elevated">
        {item.type === "video" ? (
          <Play size={40} className="mb-2 text-brand/60" />
        ) : (
          <ImageIcon size={40} className="mb-2 text-brand/60" />
        )}
        <span className="text-xs text-muted">Add {item.type}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-semibold text-white">{item.title}</p>
        {item.type === "video" && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-brand">
            <Play size={12} /> Highlight
          </span>
        )}
      </div>
    </div>
  )
}

export default function Gallery() {
  const { galleryItems } = useData()
  return (
    <section id="gallery" className="section-padding bg-surface-card/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          emoji="📸"
          title="Gallery"
          subtitle="Photos de compétition et highlights"
        />

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {galleryItems.slice(0, 3).map((item, i) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <GalleryItem item={item} />
            </div>
          ))}
        </motion.div>

        {/* Swiper carousel for highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-brand">
            Highlights
          </p>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="pb-12!"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id}>
                <GalleryItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
