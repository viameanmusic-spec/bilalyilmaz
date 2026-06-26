"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import Image from "next/image"

const LINKS = [
  { href: "#hero", label: "START" },
  { href: "#about", label: "STÜDYO" },
  { href: "#services", label: "İŞLERİMİZ" },
  { href: "#process", label: "SÜREÇ" },
  { href: "#showcase", label: "KOLEKSİYON" },
  { href: "#reviews", label: "YORUMLAR" },
  { href: "#contact", label: "İLETİŞİM" },
]

export default function SiteHeader({ scrolled }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/90 backdrop-blur-md border-b border-stone-900 h-16" : "bg-transparent h-24"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 h-full flex items-center justify-between relative">
        <button
          className="cursor-pointer relative z-50 shrink-0 w-28 lg:w-40 h-full flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
<button
  className="cursor-pointer relative z-50 shrink-0 flex items-center"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
    Bilal Yılmaz
  </h1>
</button>
        </button>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className={`${i === 0 ? "text-white" : ""} hover:text-orange-500 transition-colors`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-colors py-3 px-6"
          >
            <Phone className="w-3 h-3" />
            RANDEVU
          </a>
        </div>

        <button className="lg:hidden text-white relative z-50" onClick={() => setOpen((o) => !o)} aria-label="Menü">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#050505] border-b border-stone-900 absolute top-full left-0 w-full">
          <ul className="flex flex-col px-6 py-4 gap-4 text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="hover:text-orange-500 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)} className="text-orange-600">
                RANDEVU AL →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}