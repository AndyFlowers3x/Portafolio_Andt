import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider color="#a855f7" />
      <AboutSection />
      <StatsSection />
      <SectionDivider color="#06b6d4" />
      <SkillsSection />
      <SectionDivider color="#3b82f6" />
      <ProjectsSection />
      <SectionDivider color="#10b981" />
      <ExperienceSection />
      <SectionDivider color="#ec4899" />
      <ContactSection />
    </>
  );
}
