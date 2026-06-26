"use client"

export default function Loader({ loading }) {
  return (
    <div className={`fixed inset-0 z-[100] flex ${loading ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500 z-10 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Görsel Logo ve Glow Efekti */}
<h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
  Bilal Yılmaz
</h1>

        {/* Metin Logo ve Güçlendirilmiş Glow Efekti */}

        
        <div className="h-px w-40 bg-stone-800 overflow-hidden">
          <div className="h-full w-full bg-orange-600 origin-left animate-[loadbar_1.4s_ease-in-out]" />
        </div>
        <span className="text-[9px] tracking-[0.5em] uppercase text-stone-600 font-mono">İstanbul / STÜDYO YÜKLENİYOR</span>
      </div>

      {[100, 350, 0, 400, 200].map((delay, i) => (
        <div
          key={i}
          // Yükleme bittiğinde panellerin tıklamayı engellememesi için pointer-events-none eklendi
          className={`w-1/5 h-full bg-[#050505] pointer-events-none transition-transform duration-[900ms] ease-in ${
            loading ? "translate-y-0" : "translate-y-[100%]"
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}