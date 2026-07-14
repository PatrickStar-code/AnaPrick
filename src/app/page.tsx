"use client"

import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { ChallengesSection } from "@/components/landing/ChallengesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { FeaturedProjectsSection } from "@/components/landing/FeaturedProjectsSection"
import { StatsSection, IndustriesSection } from "@/components/landing/StatsSections"
import { WhySection } from "@/components/landing/WhySection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { CtaSection, Footer } from "@/components/landing/CtaFooter"

export default function Home() {
  return (
    <div className="relative w-full bg-[#0A2956] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ChallengesSection />
      <ProcessSection />
      <FeaturedProjectsSection />
      <StatsSection />
      <IndustriesSection />
      <WhySection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
