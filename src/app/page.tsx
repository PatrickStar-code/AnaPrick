"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ChallengesSection } from "@/components/landing/ChallengesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { FeaturedProjectsSection } from "@/components/landing/FeaturedProjectsSection";
import {
  StatsSection,
  IndustriesSection,
} from "@/components/landing/StatsSections";
import { WhySection } from "@/components/landing/WhySection";
import { CtaSection, Footer } from "@/components/landing/CtaFooter";
import { CommitmentsSection } from "@/components/landing/CommitmentsSection";

export default function Home() {
  return (
    <div className="relative w-full bg-[#0A2956] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ChallengesSection />
      <ProcessSection />
      <FeaturedProjectsSection />
      <WhySection />
      <CommitmentsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
