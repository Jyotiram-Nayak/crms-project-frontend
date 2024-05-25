import React from "react";
import StickyScrollReveal from "../../ui/sticky-scroll";
import TypewriterEffect from "../../ui/typewriter";
import ServicesSection from "@/components/ui/ServicesSection";
import BrandSection from "@/components/ui/BrandSection";

const HomePage: React.FC = () => {
  return (
    <>
      {/* TypewriterEffect */}
      <TypewriterEffect />
      {/* StickyScrollReveal */}
      <StickyScrollReveal />
      {/* Services */}
      <ServicesSection />
      {/* brands */}
      <BrandSection />
    </>
  );
};

export default HomePage;
