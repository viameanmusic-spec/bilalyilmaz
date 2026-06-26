export default function ParallaxBanner() {
  return (
    <section
      className="relative w-full h-[50vh] sm:h-[65vh] bg-fixed bg-cover bg-center border-b border-stone-950"
      style={{ backgroundImage: "url('/studio.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-center px-6 max-w-3xl">
          <span className="text-[9px] tracking-[0.5em] uppercase text-orange-600 font-bold block mb-6">
            Bilal Yılmaz / İstanbul
          </span>
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight text-balance">
            GERÇEK SANAT DERİDE YAŞAR
          </h2>
          <p className="mt-6 text-xs md:text-sm text-stone-400 uppercase tracking-widest leading-relaxed">
            Her çizgi bir karar, her gölge bir histir. Teninize ömürlük bir imza bırakmadan önce, doğru ellerde
            olduğunuzdan emin olun.
          </p>
        </div>
      </div>
    </section>
  )
}
