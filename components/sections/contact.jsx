"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Clock, Mail, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react"

export default function Contact() {
  // Tarih hesaplamaları
  const today = new Date()
  const todayString = today.toISOString().split("T")[0]

  // En yakın tarih için bugüne +1 gün ekliyoruz (Yarın)
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const tomorrowString = tomorrow.toISOString().split("T")[0]

  // Maksimum randevu tarihi: Şu andan itibaren 3 ay sonrası
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    artist_id: "",
    date: tomorrowString, // SAYFA AÇILDIĞINDA ARTIK +1 GÜN (YARIN) SEÇİLİ GELİR
    time: "",
    concept: "",
    notes: ""
  })

  const [artists, setArtists] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [isFetchingSlots, setIsFetchingSlots] = useState(false)
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("")

  // SMS Onay State'leri
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [phoneSuccessMessage, setPhoneSuccessMessage] = useState("")

  // 1. Sanatçıları Yükle
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/artists") 
        if (response.ok) {
          const data = await response.json()
          setArtists(data)
        }
      } catch (error) {
        console.error("Sanatçılar yüklenirken hata oluştu:", error)
      }
    }
    fetchArtists()
  }, [])

  // 2. Sanatçı veya Tarih değiştiğinde Müsait Saatleri Çek
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.artist_id || !formData.date) {
        setAvailableSlots([])
        return
      }

      setIsFetchingSlots(true)
      setFormData(prev => ({ ...prev, time: "" })) 

      try {
        const response = await fetch(`http://localhost:5000/available-slots?artist_id=${formData.artist_id}&date=${formData.date}`)
        if (response.ok) {
          const data = await response.json()
          
          if (data.success) {
            let slots = data.available_slots

            // Seçilen tarih bugünse (kullanıcı elle bugüne çektiyse), geçmiş saatleri filtrele
            if (formData.date === todayString) {
              const currentHour = new Date().getHours()
              const currentMinute = new Date().getMinutes()
              
              slots = slots.filter(slot => {
                const [slotHour, slotMinute] = slot.time.split(':').map(Number)
                if (slotHour > currentHour) return true
                if (slotHour === currentHour && slotMinute > currentMinute) return true
                return false
              })
            }

            setAvailableSlots(slots)
          } else {
            setAvailableSlots([])
          }
        }
      } catch (error) {
        console.error("Saatler çekilirken hata:", error)
        setAvailableSlots([])
      } finally {
        setIsFetchingSlots(false)
      }
    }

    fetchSlots()
  }, [formData.artist_id, formData.date, todayString])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTimeSelect = (selectedTime) => {
    setFormData({ ...formData, time: selectedTime })
  }

  // Sahte SMS Kodu Gönderme Tetikleyicisi
  const handleSendOtp = () => {
    if (!formData.phone) {
      setStatus("error")
      setErrorMessage("Lütfen önce geçerli bir telefon numarası giriniz!")
      return
    }
    setIsOtpSent(true)
    setErrorMessage("")
    setStatus("idle")
  }

  // Sahte SMS Kodu Doğrulama
  const handleVerifyOtp = () => {
    if (otpCode === "123") {
      setIsPhoneVerified(true)
      setPhoneSuccessMessage("Telefon doğrulandı! Randevu sürecini SMS üzerinden takip edebilirsiniz.")
      setErrorMessage("")
    } else {
      setStatus("error")
      setErrorMessage("Hatalı onay kodu! (Test kodu: 123)")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isPhoneVerified) {
      setStatus("error")
      setErrorMessage("Lütfen devam etmeden önce telefon numaranızı doğrulayın!")
      return
    }

    if (!formData.time) {
      setStatus("error")
      setErrorMessage("Lütfen müsait bir saat seçiniz!")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    const appointment_time = `${formData.date}T${formData.time}:00`
    const combinedNotes = `Telefon: ${formData.phone} | Konsept: ${formData.concept} | Ek Not: ${formData.notes}`

    const payload = {
      artist_id: formData.artist_id,
      customer_name: formData.customer_name,
      appointment_time: appointment_time,
      notes: combinedNotes,
      gsm: formData.phone

    }

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setFormData({
          customer_name: "",
          phone: "",
          artist_id: "",
          date: tomorrowString, // Sıfırlanınca yine yarına odaklar
          time: "",
          concept: "",
          notes: ""
        })
        setAvailableSlots([])
        setIsOtpSent(false)
        setOtpCode("")
        setIsPhoneVerified(false)
        setPhoneSuccessMessage("")
        setTimeout(() => setStatus("idle"), 4000)
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Randevu oluşturulurken bir hata meydana geldi.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Sunucuya ulaşılamıyor. Lütfen daha sonra tekrar deneyin.")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-40 border-b border-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-3">
            [ İLETİŞİM ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">REZERVASYON</h2>
          <p className="mt-4 text-[10px] text-stone-600 uppercase tracking-[0.2em] font-mono">
            İstanbul Bağcılar STÜDYOSU / 0501 112 21 24
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* info panel */}
          <div className="lg:col-span-5 space-y-px bg-stone-900">
            {[
              { icon: MapPin, title: "ADRES", value: "Bağcılar Mah. İstanbul / Türkiye" },
              { icon: Phone, title: "TELEFON", value: "0501 112 21 24" },
              { icon: Mail, title: "E-POSTA", value: "info@istanbuldovme.com" },
              { icon: Clock, title: "ÇALIŞMA SAATLERİ", value: "Pzt - Cmt / 11:00 - 20:00" },
            ].map((c) => (
              <div key={c.title} className="bg-[#0b0b0b] p-6 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-stone-800 text-orange-600">
                  <c.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-1">{c.title}</div>
                  <div className="text-sm text-white font-medium">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="bg-[#0b0b0b] p-6">
              <div className="text-[9px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-3">SOSYAL MEDYA</div>
              <div className="flex gap-4">
                {["Instagram", "Facebook", "TikTok"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-orange-500 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {status === "error" && (
                <div className="bg-red-950/50 border border-red-900 p-4 flex items-center gap-3 text-red-500 text-xs tracking-widest font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  placeholder="İSİM SOYİSİM"
                  className="w-full bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-white placeholder-stone-700 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono transition-colors"
                />
                
                {/* TELEFON VE SMS DOĞRULAMA ALANI */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isPhoneVerified}
                      required
                      placeholder="TELEFON NUMARASI"
                      className="flex-1 bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-white placeholder-stone-700 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono transition-colors disabled:opacity-50 disabled:border-emerald-900"
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="bg-stone-900 hover:bg-stone-800 text-stone-300 px-4 text-[10px] font-mono tracking-widest uppercase border border-stone-800 transition-colors whitespace-nowrap"
                      >
                        {isOtpSent ? "TEKRAR GÖNDER" : "KOD GÖNDER"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SMS Kod Giriş Kutusu */}
              {isOtpSent && !isPhoneVerified && (
                <div className="flex gap-2 bg-[#0b0b0b] border border-orange-600/30 p-2 items-center">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="ONAY KODUNU GİRİN (123)"
                    className="flex-1 bg-transparent px-2 py-2 text-xs text-white placeholder-stone-700 focus:outline-none uppercase tracking-widest font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors"
                  >
                    ONAYLA
                  </button>
                </div>
              )}

              {/* Telefon Doğrulandı Mesajı */}
              {isPhoneVerified && phoneSuccessMessage && (
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 flex items-center gap-3 text-emerald-500 text-xs tracking-widest font-mono uppercase">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                  <p>{phoneSuccessMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="artist_id"
                  value={formData.artist_id}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-stone-500 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono appearance-none transition-colors"
                >
                  <option value="" disabled>SANATÇI SEÇİN</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name.toUpperCase()}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={todayString}
                  max={maxDateString}
                  required
                  className="w-full bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-stone-500 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono transition-colors [color-scheme:dark]"
                />
              </div>

              {/* MÜSAİT SAATLER KUTUSU */}
              <div className="w-full bg-[#0b0b0b] border border-stone-900 p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-4">
                  MÜSAİT SAATLER
                </div>
                
                {!formData.artist_id ? (
                  <p className="text-xs text-stone-500 font-mono text-center py-4">
                    Saatleri görmek için lütfen bir sanatçı seçiniz.
                  </p>
                ) : isFetchingSlots ? (
                  <div className="flex justify-center items-center py-4">
                    <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-xs text-red-500 font-mono text-center py-4">
                    Seçilen tarihte uygun saat bulunmamaktadır. Lütfen başka bir gün seçin.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`py-3 px-2 flex flex-col items-center justify-center border transition-all duration-200 ${
                          formData.time === slot.time
                            ? "border-orange-500 bg-orange-600/10 text-orange-500"
                            : "border-stone-800 text-stone-400 hover:border-orange-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-bold">{slot.time}</span>
                        <span className="text-[10px] opacity-70 mt-1">{slot.end_time}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <select
                name="concept"
                value={formData.concept}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-stone-500 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono appearance-none transition-colors"
              >
                <option value="" disabled>KONSEPT SEÇİN</option>
                <option value="CUSTOM DÖVME TASARIMI">CUSTOM DÖVME TASARIMI</option>
                <option value="COVER UP (KAPATMA)">COVER UP (KAPATMA)</option>
                <option value="PIERCING UYGULAMASI">PIERCING UYGULAMASI</option>
                <option value="REALISM / PORTRE">REALISM / PORTRE</option>
              </select>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                placeholder="FİKRİNİZİ, BÖLGEYİ VEYA BOYUTU KISACA ANLATIN..."
                className="w-full bg-[#0b0b0b] border border-stone-900 px-4 py-4 text-xs text-white placeholder-stone-700 focus:outline-none focus:border-orange-600 tracking-widest font-mono resize-none uppercase transition-colors"
              />

              <button
                type="submit"
                disabled={status === "loading" || !isPhoneVerified}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  "GÖNDERİLİYOR..."
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> RANDEVU OLUŞTURULDU SMS İLE BİLGİLENDİRİLECEKSİNİZ
                  </>
                ) : !isPhoneVerified ? (
                  "LÜTFEN ÖNCE TELEFONU DOĞRULAYIN"
                ) : (
                  "RANDEVU OLUŞTUR"
                )}
              </button>
              
              {status === "success" && (
                <p className="text-[10px] text-center text-orange-500 font-mono tracking-widest uppercase mt-4">
                  Randevunuz başarıyla kaydedildi. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}