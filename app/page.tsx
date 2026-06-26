"use client"

import { useState, useEffect } from "react"
import Loader from "@/components/sections/loader"
import SiteHeader from "@/components/sections/site-header"
import Hero from "@/components/sections/hero"
import Marquee from "@/components/sections/marquee"
import Stats from "@/components/sections/stats"
import About from "@/components/sections/about"
import Services from "@/components/sections/services"
import Process from "@/components/sections/process"
import ParallaxBanner from "@/components/sections/parallax-banner"
import Showcase from "@/components/sections/showcase"
import Reviews from "@/components/sections/reviews"
import Faq from "@/components/sections/faq"
import Contact from "@/components/sections/contact"
import SiteFooter from "@/components/sections/site-footer"
import WhatsappButton from "@/components/sections/whatsapp-button"

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen bg-[#070707] text-stone-400 font-sans selection:bg-orange-600 selection:text-white scroll-smooth tracking-tight relative">
        <SiteHeader scrolled={scrolled} />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <About />
          <Services />
          <Process />
          <ParallaxBanner />
          <Showcase />
          <Reviews />
          <Faq />
          <Contact />
        </main>
        <SiteFooter />
        <WhatsappButton />
      </div>
    </>
  )
}
