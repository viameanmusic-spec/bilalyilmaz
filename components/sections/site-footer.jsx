
import Image from "next/image"


export default function SiteFooter() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative overflow-hidden">
      <div
        className="absolute inset-x-0 -bottom-10 text-center text-[18vw] font-black leading-none select-none pointer-events-none text-transparent font-sans italic opacity-[0.04]"
        style={{ WebkitTextStroke: "1px #ffffff" }}
      >
        Bilal Yılmaz
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="text-3xl font-black tracking-tighter text-white font-sans italic mb-4">
<h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
  Bilal Yılmaz
</h1>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              İstanbul Bayrampaşa&apos;de, kişiye özel dövme ve piercing sanatında güvenin adresi. Sözler uçar, mürekkep
              kalır.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px]">MENÜ</h3>
            <ul className="space-y-2 text-xs text-stone-500 font-mono">
              <li><a href="#about" className="hover:text-orange-500 transition-colors">Stüdyo</a></li>
              <li><a href="#services" className="hover:text-orange-500 transition-colors">İşlerimiz</a></li>
              <li><a href="#showcase" className="hover:text-orange-500 transition-colors">Koleksiyon</a></li>
              <li><a href="#reviews" className="hover:text-orange-500 transition-colors">Yorumlar</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px]">SAATLER</h3>
            <p className="text-xs text-stone-500 mb-1 font-mono">Pzt - Cmt</p>
            <p className="text-xs text-orange-600 font-bold mb-3 font-mono">12:00 - 00:00</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px]">İLETİŞİM</h3>
            <p className="text-xs text-stone-500 mb-2 font-mono">Kartaltepe, Bilgehan Cd. No:9 A Kat 2, 34040 Bayrampaşa/İstanbul</p>
            <p className="text-xs text-stone-500 mb-2 font-mono">T: 0501 112 21 24</p>
            <p className="text-xs text-stone-500 font-mono">E: bialyilmaz@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] tracking-[0.3em] text-stone-700 font-mono border-t border-stone-900 pt-8">
          <span>© 2026 Bilal Yılmaz. BACK TO STREETS.</span>
          <span>İstanbul / TÜRKİYE</span>
        </div>
      </div>
    </footer>
  )
}
