"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import "./globals.css"

export default function RootLayout({ children }) {
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const publicPaths = ["/login"]
    
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      
      if (publicPaths.includes(pathname)) {
        setIsAuthChecking(false)
        return
      }

      if (!token) {
        router.push("/login")
      } else {
        setIsAuthChecking(false)
      }
    }

    checkAuth()

    const interval = setInterval(() => {
      const token = localStorage.getItem("token")
      if (!token && !publicPaths.includes(pathname)) {
        router.push("/login")
      }
    }, 1000)

    window.addEventListener("storage", checkAuth)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", checkAuth)
    }
  }, [router, pathname])

  return (
    <html lang="tr">
      <body>
        {isAuthChecking ? (
          <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-500 font-mono text-xs uppercase tracking-widest gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            Sistem Kontrol Ediliyor...
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  )
}