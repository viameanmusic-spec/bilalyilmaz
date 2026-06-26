import { PenTool, Stethoscope, Layers, Type, Hexagon, Eye } from "lucide-react"

const SERVICES = [
  {
    icon: PenTool,
    title: "CUSTOM INK",
    desc: "Aklınızdaki fikri referans alıp, anatominize en uygun şekilde sıfırdan çiziyor ve size özel eşsiz bir tasarıma dönüştürüyoruz.",
  },
  {
    icon: Stethoscope,
    title: "PIERCING LAB",
    desc: "Titanyum ve cerrahi çelik takılar kullanılarak, sterilizasyon standartlarının en üst seviyede tutulduğu güvenli piercing uygulamaları.",
  },
  {
    icon: Layers,
    title: "COVER UP",
    desc: "Eski, rengi solmuş veya istenmeyen dövmelerinizi profesyonel tasarım teknikleriyle yepyeni bir sanat eserinin altına gizliyoruz.",
  },
  {
    icon: Eye,
    title: "REALISM",
    desc: "Portre ve nesne çalışmalarında, ışık-gölge dengesini ustaca kullanarak deride fotoğraf gerçekliğinde eserler yaratıyoruz.",
  },
  {
    icon: Hexagon,
    title: "GEOMETRIC & DOTWORK",
    desc: "Hassas nokta tekniği ve geometrik kompozisyonlarla, simetrinin gücünü teninizde sanata dönüştürüyoruz.",
  },
  {
    icon: Type,
    title: "LETTERING",
    desc: "El yazısı, kaligrafi ve özgün font tasarımlarıyla; sözlerinizi kalıcı ve estetik bir forma kavuşturuyoruz.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 md:py-40 max-w-7xl mx-auto px-6 border-b border-stone-950 relative overflow-hidden">
      <div
        className="absolute left-6 top-12 text-[12rem] sm:text-[18rem] md:text-[24rem] font-black leading-none select-none pointer-events-none text-transparent font-sans italic opacity-25"
        style={{ WebkitTextStroke: "2px #ea580c" }}
      >
        02
      </div>

      <div className="flex justify-end relative z-10">
        <div className="max-w-5xl w-full">
          <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-4 text-right">
            [ UZMANLIK ALANLARIMIZ ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-16 text-right">
            STÜDYO KONSEPTİ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-900">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group bg-[#0b0b0b] hover:bg-[#101010] p-8 transition-colors relative"
              >
                <div className="w-11 h-11 flex items-center justify-center border border-stone-800 group-hover:border-orange-600 group-hover:bg-orange-600/10 transition-colors mb-5">
                  <s.icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">{s.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                <span className="absolute top-6 right-6 text-[10px] font-mono text-stone-700 group-hover:text-orange-600 transition-colors">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
