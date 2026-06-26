"use client"

import dynamic from "next/dynamic"

const TattooMachine = dynamic(() => import("@/components/three/tattoo-machine"), { ssr: false })

const STEPS = [
  { n: "01", title: "KONSÜLTASYON", desc: "Fikrinizi dinliyor, referanslarınızı inceliyor ve bölge-boyut analizini birlikte yapıyoruz." },
  { n: "02", title: "TASARIM", desc: "Anatominize özel, sıfırdan dijital ve el çizimi taslaklar hazırlıyoruz. Onayınız olmadan iğne deriye değmez." },
  { n: "03", title: "UYGULAMA", desc: "Steril, tek kullanımlık ekipmanlarla; en konforlu ve hijyenik koşullarda çalışmaya başlıyoruz." },
  { n: "04", title: "BAKIM", desc: "İyileşme sürecinde size özel bakım protokolü ve uzun ömürlü renk garantisi sunuyoruz." },
]

export default function Process() {
  return (
    <section id="process" className="py-32 md:py-40 border-b border-stone-950 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-4">[ NASIL ÇALIŞIYORUZ ]</span>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-16">
          MÜREKKEBİN <span className="text-orange-600">YOLCULUĞU</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="group flex gap-6 py-7 border-b border-stone-900 last:border-b-0 hover:bg-[#0b0b0b] transition-colors px-2"
              >
                <span className="text-3xl md:text-4xl font-black italic text-stone-700 group-hover:text-orange-600 transition-colors shrink-0 leading-none">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">{s.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
