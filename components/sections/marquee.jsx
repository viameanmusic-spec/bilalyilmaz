"use client"

const ITEMS = [
  "CUSTOM INK",
  "BLACK & GREY",
  "FINE LINE",
  "COVER UP",
  "PIERCING LAB",
  "REALISM",
  "DOTWORK",
  "GEOMETRIC",
  "LETTERING",
]

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-stone-900 bg-[#0a0a0a] py-5">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-stone-500 whitespace-nowrap font-sans italic">
              {item}
            </span>
            <span className="text-orange-600 text-lg leading-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
