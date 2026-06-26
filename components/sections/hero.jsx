"use client"

import { MapPin, Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Hero() {
  const [snowflakes, setSnowflakes] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    // Kar taneciklerini oluştur (bir kez)
    const newSnowflakes = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % olarak
      y: Math.random() * 100, // % olarak
      size: Math.random() * 3 + 1, // 1-4px
      opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
      depth: Math.random() * 0.8 + 0.2 // 0.2-1.0 (paralaks yoğunluğu için)
    }))
    setSnowflakes(newSnowflakes)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Paralaks hesaplaması
  const getSnowflakeOffset = (depth) => {
    if (typeof window === "undefined") return { x: 0, y: 0 }
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const sensitivity = 0.05 // Genel paralaks hassasiyeti
    const offsetX = (mousePosition.x - centerX) * depth * sensitivity
    const offsetY = (mousePosition.y - centerY) * depth * sensitivity
    return { x: offsetX, y: offsetY }
  }

  return (
    <section
      id="hero"
      ref={sectionRef} // Fare olaylarını dinlemek için referans
      className="relative min-h-screen flex flex-col justify-center border-b border-stone-950 pt-24 overflow-hidden bg-black"
    >
      <style>{`
        @keyframes wave-flow {
          0% { transform: translateX(0%) scaleY(1); }
          100% { transform: translateX(-20%) scaleY(1.3); }
        }
        .animate-wave-1 {
          animation: wave-flow 18s ease-in-out infinite alternate;
        }
        .animate-wave-2 {
          animation: wave-flow 24s ease-in-out infinite alternate-reverse;
        }
        .animate-wave-3 {
          animation: wave-flow 30s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Kabartılmış ve Belirginleştirilmiş SVG Dalgalar */}
      <div className="absolute inset-0 z-0 flex items-end opacity-90 pointer-events-none">
        <svg
          className="absolute w-[200vw] h-[65vh] animate-wave-1 text-stone-900"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg
          className="absolute w-[200vw] h-[55vh] animate-wave-2 text-stone-950"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg
          className="absolute w-[200vw] h-[45vh] animate-wave-3 text-orange-900/15"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,170.7C672,160,768,192,864,208C960,224,1056,224,1152,192C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Havada Asılı Kar Katmanı (z-index ve konum) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => {
          const offset = getSnowflakeOffset(flake.depth)
          return (
            <div
              key={flake.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${flake.x}%`,
                top: `${flake.y}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                opacity: flake.opacity,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.1s ease-out" // Pürüzsüz hareket
              }}
            />
          )
        })}
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#070707_100%)]" />

      <div className="max-w-6xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center z-10 pointer-events-none select-none">
        <span className="text-[9px] tracking-[0.5em] uppercase text-stone-400 font-black mb-6 inline-flex items-center gap-2 border border-stone-800/60 bg-black/30 backdrop-blur-sm px-4 py-2">
          <MapPin className="w-3 h-3 text-orange-600" />
          Sancaktepe Mahallesi 912. Sokak No: 31/A Bağcılar İstanbul Türkiye 2026
        </span>

        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black  tracking-tighter text-white max-w-5xl leading-[0.82] font-sans italic [text-shadow:0_4px_40px_rgba(0,0,0,0.8)]">
          BEST TATTO ARTİST
          <span className="text-orange-600 font-serif block tracking-normal text-3xl sm:text-5xl md:text-6xl mt-4">
            Bilal Yılmaz
          </span>
        </h1>

        <p className="mt-8 text-xs sm:text-sm text-stone-400 max-w-lg uppercase tracking-widest leading-relaxed">
          İstanbul Bağcılar&apos;da yer alan stüdyomuzda, kişiye özel tasarımlar ve en üst düzey hijyenik koşullarla
          hayalinizdeki sanatı gerçeğe dönüştürüyoruz.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md pointer-events-auto">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold tracking-[0.3em] uppercase transition-all py-4 px-10 text-center"
          >
            RANDEVU AL
          </a>
          <a
            href="tel:05323244810"
            className="w-full sm:w-auto bg-transparent hover:bg-stone-950 text-stone-300 hover:text-white text-[10px] font-bold tracking-[0.3em] uppercase transition-all py-4 px-10 border border-stone-800 text-center"
          >
            0501 112 21 24
          </a>
        </div>

        <div className="mt-10 flex items-center gap-2 pointer-events-auto">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
            ))}
          </div>
          <span className="text-[10px] tracking-widest uppercase text-stone-500 font-mono">
            500+ mutlu müşteri / 5.0 puan
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex items-center justify-center opacity-30 z-10">
        <span className="text-[10px] tracking-[0.5em] uppercase text-white font-mono animate-bounce">AŞAĞI KAYDIR</span>
      </div>
    </section>
  )
}