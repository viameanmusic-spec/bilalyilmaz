"use client"

import { useEffect, useRef, useState } from "react"

function Counter({ end, suffix = "" }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.floor(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

const STATS = [
  { end: 11, suffix: "+", label: "YIL TECRÜBE" },
  { end: 500, suffix: "+", label: "TAMAMLANAN İŞ" },
  { end: 100, suffix: "%", label: "STERİL ORTAM" },
  { end: 50, suffix: "+", label: "ÖZEL TASARIM / AY" },
]

export default function Stats() {
  return (
    <section className="bg-[#070707] border-b border-stone-950 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center border-r border-stone-900 last:border-r-0 even:border-r-0 md:even:border-r">
            <div className="text-5xl md:text-7xl font-black text-white tracking-tighter italic">
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-stone-500 font-mono">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
