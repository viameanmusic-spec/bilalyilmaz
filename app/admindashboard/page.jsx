"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Phone, Paintbrush, FileText, X, RefreshCw, Loader2, Search, History, Clock4, XCircle } from "lucide-react"

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedArtist, setSelectedArtist] = useState("ALL")

  const getToken = () => {
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    if (cookieToken) return cookieToken
    return localStorage.getItem('token') || ''
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const token = getToken()
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      const [appointmentsRes, artistsRes] = await Promise.all([
        fetch("http://localhost:5000/appointments", { headers }),
        fetch("http://localhost:5000/artists", { headers })
      ])

      if (appointmentsRes.ok) {
        const appData = await appointmentsRes.json()
        const appointmentsArray = Array.isArray(appData) ? appData : (appData.appointments || appData.data || [])
        setAppointments(appointmentsArray)
      }

      if (artistsRes.ok) {
        const artData = await artistsRes.json()
        const artistsArray = Array.isArray(artData) ? artData : (artData.artists || artData.data || [])
        setArtists(artistsArray)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const cancelAppointment = async (id) => {
    try {
      const token = getToken()
      const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        setAppointments(appointments.map(app => 
          app.id === id ? { ...app, status: "rejected" } : app
        ))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const now = new Date()

  const searchedAppointments = appointments.filter(app => {
    const matchesSearch = app.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || app.phone.includes(searchTerm)
    const artistIdentifier = app.artist_name || `ID: ${app.artist_id}`
    const matchesArtist = selectedArtist === "ALL" || artistIdentifier === selectedArtist
    
    return matchesSearch && matchesArtist
  })

  const displayedAppointments = searchedAppointments.filter(app => {
    const appDate = new Date(app.appointment_time)
    if (activeTab === "upcoming") {
      return appDate >= now
    } else if (activeTab === "past") {
      return appDate < now
    } else {
      return app.status === "rejected"
    }
  }).sort((a, b) => {
    if (activeTab !== "cancelled") {
      if (a.status === "rejected" && b.status !== "rejected") return 1
      if (a.status !== "rejected" && b.status === "rejected") return -1
    }

    const dateA = new Date(a.appointment_time)
    const dateB = new Date(b.appointment_time)

    if (activeTab === "upcoming") {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "-", time: "-" }
    const dateObj = new Date(isoString)
    return {
      date: dateObj.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 font-sans p-4 md:p-12">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-orange-600 font-bold block mb-2">
              [ YÖNETİM PANELİ ]
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
              REZERVASYONLAR
            </h1>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-widest uppercase bg-stone-900 hover:bg-stone-800 border border-stone-800 px-4 py-3 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange-600" : "text-stone-400"}`} />
            Yenile
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-stone-800">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-mono tracking-widest uppercase transition-all ${
              activeTab === "upcoming" 
                ? "bg-stone-900 text-orange-500 border-t-2 border-orange-500" 
                : "text-stone-500 hover:bg-stone-900/50 hover:text-stone-300 border-t-2 border-transparent"
            }`}
          >
            <Clock4 className="w-4 h-4" />
            Güncel & Gelecek
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-mono tracking-widest uppercase transition-all ${
              activeTab === "past" 
                ? "bg-stone-900 text-orange-500 border-t-2 border-orange-500" 
                : "text-stone-500 hover:bg-stone-900/50 hover:text-stone-300 border-t-2 border-transparent"
            }`}
          >
            <History className="w-4 h-4" />
            Geçmiş
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-mono tracking-widest uppercase transition-all ${
              activeTab === "cancelled" 
                ? "bg-stone-900 text-orange-500 border-t-2 border-orange-500" 
                : "text-stone-500 hover:bg-stone-900/50 hover:text-stone-300 border-t-2 border-transparent"
            }`}
          >
            <XCircle className="w-4 h-4" />
            İptal Edilenler
          </button>
        </div>

        <div className="flex flex-col gap-4 bg-[#0b0b0b] p-4 border border-stone-900">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
              <input 
                type="text"
                placeholder="İSİM VEYA TELEFON..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-3 text-xs text-white placeholder-stone-700 focus:outline-none focus:border-orange-600 uppercase tracking-widest font-mono transition-colors"
              />
            </div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest w-full sm:w-auto text-left sm:text-right">
              LİSTELENEN: <span className="text-white font-bold">{displayedAppointments.length}</span> KAYIT
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 items-center snap-x">
            <button
              onClick={() => setSelectedArtist("ALL")}
              className={`snap-start shrink-0 px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all border ${
                selectedArtist === "ALL" 
                  ? "bg-stone-900 border-orange-600 text-orange-500" 
                  : "bg-stone-950 border-stone-800 text-stone-500 hover:text-stone-300 hover:border-stone-700"
              }`}
            >
              TÜMÜ
            </button>
            {artists.map(artist => (
              <button
                key={artist.id || artist.name}
                onClick={() => setSelectedArtist(artist.name)}
                className={`snap-start shrink-0 px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all border ${
                  selectedArtist === artist.name 
                    ? "bg-stone-900 border-orange-600 text-orange-500" 
                    : "bg-stone-950 border-stone-800 text-stone-500 hover:text-stone-300 hover:border-stone-700"
                }`}
              >
                {artist.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-transparent md:bg-[#0b0b0b] md:border md:border-stone-900">
          <table className="w-full text-left text-sm block md:table">
            <thead className="hidden md:table-header-group bg-stone-900/50 border-b border-stone-800 text-[10px] uppercase tracking-[0.2em] font-mono text-stone-500 whitespace-nowrap">
              <tr>
                <th className="px-6 py-4 font-normal">Tarih / Saat</th>
                <th className="px-6 py-4 font-normal">Müşteri Detayları</th>
                <th className="px-6 py-4 font-normal">Sanatçı</th>
                <th className="px-6 py-4 font-normal">Notlar</th>
                <th className="px-6 py-4 font-normal text-center">Durum</th>
                <th className="px-6 py-4 font-normal text-right">İşlem</th>
              </tr>
            </thead>
            
            <tbody className="block md:table-row-group md:divide-y md:divide-stone-900/50">
              {isLoading ? (
                <tr className="block md:table-row bg-[#0b0b0b] border border-stone-900 md:border-none p-8 md:p-0 mb-4 rounded-lg md:rounded-none">
                  <td colSpan="6" className="block md:table-cell md:px-6 md:py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto" />
                  </td>
                </tr>
              ) : displayedAppointments.length === 0 ? (
                <tr className="block md:table-row bg-[#0b0b0b] border border-stone-900 md:border-none p-8 md:p-0 mb-4 rounded-lg md:rounded-none">
                  <td colSpan="6" className="block md:table-cell md:px-6 md:py-12 text-center text-stone-600 font-mono text-xs uppercase tracking-widest">
                    Kayıt Bulunamadı.
                  </td>
                </tr>
              ) : (
                displayedAppointments.map((app) => {
                  const { date, time } = formatDateTime(app.appointment_time)
                  const notesRaw = app.notes || ""
                  const splitNotes = notesRaw.split('| Ek Not: ')
                  const actualNote = splitNotes.length > 1 ? splitNotes[1] : notesRaw

                  return (
                    <tr key={app.id} className="block md:table-row bg-[#0b0b0b] border border-stone-800 md:border-none mb-4 md:mb-0 p-4 md:p-0 rounded-lg md:rounded-none hover:bg-stone-900/30 transition-colors">
                      
                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 border-b border-stone-800/50 md:border-none whitespace-nowrap">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest">Tarih/Saat</span>
                        <div className="flex flex-col gap-1 items-end md:items-start">
                          <div className="flex items-center gap-2 text-white font-medium">
                            <Calendar className="w-4 h-4 text-orange-600 hidden md:block" />
                            {date}
                          </div>
                          <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
                            <Clock className="w-3 h-3 hidden md:block" />
                            {time}
                          </div>
                        </div>
                      </td>

                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 border-b border-stone-800/50 md:border-none whitespace-nowrap">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest">Müşteri</span>
                        <div className="flex flex-col gap-1 items-end md:items-start">
                          <div className="flex items-center gap-2 text-white font-bold uppercase text-xs">
                            <User className="w-4 h-4 text-stone-600 hidden md:block" />
                            {app.customer_name}
                          </div>
                          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
                            <Phone className="w-3 h-3 hidden md:block" />
                            {app.phone}
                          </div>
                        </div>
                      </td>

                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 border-b border-stone-800/50 md:border-none whitespace-nowrap">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest">Sanatçı</span>
                        <div className="flex flex-col gap-1 items-end md:items-start">
                          <div className="flex items-center gap-2 text-stone-300 text-xs font-bold uppercase">
                            <Paintbrush className="w-4 h-4 text-stone-600 hidden md:block" />
                            {app.artist_name || `ID: ${app.artist_id}`}
                          </div>
                          <div className="text-[10px] text-orange-500 font-mono uppercase tracking-widest bg-orange-950/30 px-2 py-1 rounded inline-block mt-1">
                            {app.concept || "BİLİNMİYOR"}
                          </div>
                        </div>
                      </td>

                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 border-b border-stone-800/50 md:border-none">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest shrink-0 mr-4">Notlar</span>
                        <div className="flex items-center gap-2 text-stone-400 text-xs italic text-right md:text-left max-w-[200px] md:max-w-xs truncate">
                          <FileText className="w-4 h-4 shrink-0 text-stone-700 hidden md:block" />
                          <span className="truncate" title={actualNote}>
                            {actualNote || "Not eklenmemiş."}
                          </span>
                        </div>
                      </td>

                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 border-b border-stone-800/50 md:border-none md:text-center whitespace-nowrap">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest">Durum</span>
                        <div>
                          {app.status === "rejected" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/50 text-red-500 text-[10px] font-mono tracking-widest uppercase border border-red-900/50">
                              İptal Edildi
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/50 text-emerald-500 text-[10px] font-mono tracking-widest uppercase border border-emerald-900/50">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                              Onaylı
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="flex justify-between items-center md:table-cell py-3 md:py-4 px-2 md:px-6 pt-5 md:pt-4 md:text-right">
                        <span className="md:hidden text-[10px] text-stone-500 font-mono uppercase tracking-widest">İşlem</span>
                        <div className="flex items-center justify-end gap-2">
                          {app.status !== "rejected" && (
                            <button 
                              onClick={() => cancelAppointment(app.id)}
                              title="İptal Et"
                              className="flex items-center justify-center p-3 md:p-2 bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-500 border border-stone-800 hover:border-red-900 transition-all rounded-sm md:rounded-none"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}