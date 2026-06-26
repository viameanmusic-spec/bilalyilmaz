import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = [
  {
    q: "DÖVME YAPTIRMAK ACITIR MI?",
    a: "Ağrı eşiği kişiden kişiye ve bölgeden bölgeye değişir. Profesyonel teknik ve doğru çalışma temposuyla rahatsızlığı minimumda tutuyoruz. Hassas bölgeler için ek konfor önlemleri alıyoruz.",
  },
  {
    q: "RANDEVU ALMAM ŞART MI?",
    a: "Evet. Her çalışmaya hak ettiği özeni gösterebilmek için randevu sistemiyle ilerliyoruz. Telefon veya WhatsApp üzerinden kolayca yer ayırtabilirsiniz.",
  },
  {
    q: "HİJYEN KOŞULLARINIZ NASIL?",
    a: "Tüm iğne ve uçlar tek kullanımlıktır ve uygulamadan sonra imha edilir. Çalışma alanı her seansta steril edilir, tek kullanımlık bariyerler kullanılır. Sağlık Bakanlığı standartlarına tam uyumluyuz.",
  },
  {
    q: "TASARIM ÜCRETİ ALIYOR MUSUNUZ?",
    a: "Custom tasarımlar size özel sıfırdan çizilir. Tasarım süreci konsültasyona dahildir; onaylanan tasarımlar yalnızca size uygulanır, başkasına tekrarlanmaz.",
  },
  {
    q: "İYİLEŞME SÜRECİ NE KADAR SÜRER?",
    a: "Yüzeysel iyileşme ortalama 2-3 hafta, tam iyileşme ise 1-2 ay sürer. Size özel bir bakım protokolü veriyor ve süreç boyunca iletişimde kalıyoruz.",
  },
  {
    q: "REŞİT OLMAM GEREKİYOR MU?",
    a: "Evet, yasal olarak 18 yaşını doldurmuş olmanız ve kimlik ibraz etmeniz gerekmektedir. İstisna kabul edilmez.",
  },
]

export default function Faq() {
  return (
    <section className="py-32 md:py-40 border-b border-stone-950 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-4">
            [ SIKÇA SORULANLAR ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
            MERAK EDİLENLER
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-stone-900">
              <AccordionTrigger className="text-left text-white hover:text-orange-500 text-sm font-bold uppercase tracking-wider hover:no-underline py-6">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-stone-500 text-sm leading-relaxed pb-6">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
