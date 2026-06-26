import { ShieldCheck, Award, Sparkles } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-32 md:py-40 max-w-7xl mx-auto px-6 border-b border-stone-950 relative overflow-hidden">
      <div
        className="absolute right-6 top-6 text-[12rem] sm:text-[18rem] md:text-[26rem] font-black leading-none select-none pointer-events-none text-transparent font-sans italic opacity-20 z-0"
        style={{ WebkitTextStroke: "2px #ea580c" }}
      >
        01
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-6 space-y-8">
          <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block">[ HİKAYEMİZ ]</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
            SÖZLER UÇAR, <br />
            MÜREKKEP KALIR.
          </h2>
          <div className="space-y-6 text-stone-500 text-sm leading-relaxed max-w-lg">
            <p>
              Her dövmenin bir ruhu ve hikayesi olduğuna inanıyoruz. Klasik kalıplardan sıyrılarak, anatominize en
              uygun ve tamamen size ait tasarımları oluşturmak için buradayız.
            </p>
            <p className="border-l-2 border-orange-600 pl-4 italic text-stone-300">
              &ldquo;Vücudunuz hayat yolculuğunuzun tuvalidir; biz ise o tuvale en çok yakışacak, kalıcı izleri bırakmak
              için tutkuyla çalışıyoruz.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: Award, label: "USTA İŞÇİLİK" },
              { icon: ShieldCheck, label: "TAM HİJYEN" },
              { icon: Sparkles, label: "ÖZGÜN TASARIM" },
            ].map((f) => (
              <div key={f.label} className="border border-stone-900 bg-[#0b0b0b] p-4 flex flex-col items-center gap-3 text-center">
                <f.icon className="w-5 h-5 text-orange-600" />
                <span className="text-[9px] tracking-widest uppercase text-stone-400 font-mono">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] bg-stone-950 border border-stone-900 p-3 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 group">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-stone-700 -translate-x-1 -translate-y-1 group-hover:border-orange-600 transition-colors" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-stone-700 translate-x-1 translate-y-1 group-hover:border-orange-600 transition-colors" />
            <img
              src="/artist.png"
              alt="Bilal Yılmaz stüdyosunda çalışan dövme sanatçısı Bilal Yılmaz "
              className="w-full h-full object-cover brightness-90 border border-stone-900"
            />
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 border-l-2 border-orange-600">
              <span className="block text-white text-sm font-black italic tracking-tight">Bilal Yılmaz </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-stone-400 font-mono">KURUCU / RESIDENT ARTIST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
