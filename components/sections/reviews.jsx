import { Star, Quote } from "lucide-react"

const REVIEWS = [
  {
    text: "İstanbul'da çizgilerine güvendiğim tek stüdyo. Bilal Yılmaz hoca hayal ettiğim konsepti tam anlamıyla sırtıma işledi. Sterilizasyon ve ortamın loş, sakin havası kusursuzdu.",
    name: "HAKAN K.",
    loc: "Bağcılar",
  },
  {
    text: "İlk dövmem olduğu için çok endişeliydim ama tasarım sürecindeki yaklaşımı ve profesyonelliği tüm korkumu aldı. Net, keskin çizgiler arayan hiç düşünmesin.",
    name: "MELİS A.",
    loc: "SEYHAN",
  },
  {
    text: "Cover up konusunda gerçek bir sanatçı. Yıllardır pişman olduğum dövmeyi öyle bir esere dönüştürdü ki, artık kolumu gururla gösteriyorum.",
    name: "EMRE T.",
    loc: "ÇUKUROVA",
  },
  {
    text: "Hijyen takıntılı biriyim ve burada her şey tek kullanımlık, steril ve profesyoneldi. İyileşme süreci sorunsuz geçti, renkler hâlâ capcanlı.",
    name: "ZEYNEP D.",
    loc: "İstanbul",
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 md:py-40 max-w-7xl mx-auto px-6 border-b border-stone-950 relative overflow-hidden">
      <div
        className="absolute left-6 top-12 text-[12rem] sm:text-[18rem] md:text-[24rem] font-black leading-none select-none pointer-events-none text-transparent font-sans italic opacity-25"
        style={{ WebkitTextStroke: "2px #ea580c" }}
      >
        04
      </div>

      <div className="relative z-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-4">
          [ MÜŞTERİ DENEYİMLERİ ]
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-16">
          MÜREKKEP SÖZLERİ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-900">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-[#0b0b0b] p-8 md:p-10 space-y-5 relative">
              <Quote className="w-8 h-8 text-orange-600/40" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
                ))}
              </div>
              <p className="text-sm text-stone-200 italic leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 pt-2 border-t border-stone-900">
                — {r.name} / {r.loc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
