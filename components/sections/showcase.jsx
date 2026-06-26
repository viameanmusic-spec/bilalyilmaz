const WORKS = [
  { src: "/work-1.png", title: "ASLAN / REALISM", tag: "FOREARM" },
  { src: "/work-2.png", title: "GÜL / BLACK & GREY", tag: "ARM" },
  { src: "/work-3.png", title: "MANDALA / DOTWORK", tag: "SHOULDER" },
  { src: "/work-4.png", title: "GÖZ / MICRO REALISM", tag: "FOREARM" },
  { src: "/work-5.png", title: "YILAN / BLACKWORK", tag: "FOREARM" },
  { src: "/work-6.png", title: "SAAT & GÜL / SLEEVE", tag: "SLEEVE" },
  { src: "/work-7.png", title: "DAĞ / FINE LINE", tag: "CALF" },
  { src: "/work-8.png", title: "KURUKAFA / REALISM", tag: "ARM" },
]

export default function Showcase() {
  return (
    <section id="showcase" className="py-32 md:py-40 max-w-7xl mx-auto px-6 border-b border-stone-950 relative overflow-hidden">
      <div
        className="absolute right-6 top-12 text-[12rem] sm:text-[18rem] md:text-[24rem] font-black leading-none select-none pointer-events-none text-transparent font-sans italic opacity-25"
        style={{ WebkitTextStroke: "2px #ea580c" }}
      >
        03
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-4">[ PORTFOLYO ]</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
              DUVARLAR VE DERİLER
            </h2>
          </div>
          <a
            href="#contact"
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 hover:text-orange-500 transition-colors border-b border-stone-800 pb-1 w-fit"
          >
            TÜM KOLEKSİYONU GÖR →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {WORKS.map((w, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-[#0b0b0b] border border-stone-900 aspect-[3/4]"
            >
              <img
                src={w.src || "/placeholder.svg"}
                alt={`${w.title} dövme çalışması`}
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-orange-500 font-mono">{w.tag}</span>
                <span className="text-sm font-bold text-white uppercase italic tracking-tight">{w.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
