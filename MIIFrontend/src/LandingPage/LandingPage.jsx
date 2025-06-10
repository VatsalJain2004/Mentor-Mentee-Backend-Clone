import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from './AboutSection';
import DeveloperCard from './DeveloperCard';
import MentorCard from './MentorCard';
import Footer from '../LandingPage/Footer';
import Testimonials from '../LandingPage/Testimonials';

const LandingPage = () => {
  return (
    <div className="LandingPage ">
      <HeroSection />
      <AboutSection />
      <Testimonials />
      <DeveloperCard />
      <MentorCard />
      <Footer />
    </div>
  );
};

export default LandingPage;
