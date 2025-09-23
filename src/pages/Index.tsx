import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";

import LeetCodeSection from "@/components/portfolio/LeetCodeSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <LeetCodeSection />
      </main>
    </div>
  );
};

export default Index;
