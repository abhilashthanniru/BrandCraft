import React from "react";
import Hero from "../components/Hero";
import BrandingSection from "../components/BrandingSection";
import Working from "../components/Working";
import BrandBenefits from "../components/BrandBenifits";
import Reviews from "../components/Reviews";
import Premium from "../components/Premium";
import FAQ from "../components/FAQ";



const Home = () => {
  return (
    <div>
      <Hero />
      <BrandingSection/>
      <Working/>
      <BrandBenefits/>
      <Reviews/>
      <Premium/>
      <FAQ/>
    </div>
  );
};

export default Home;
