import React from "react";
import Navbar from "./Components/Common/Navbar";
import Banner from "./Components/Home/Banner";
import Career from "./Components/Home/Career";
import Features from "./Components/Home/Features";
import TeamSection from "./Components/Home/Team";
import AboutUs from "./Components/Home/About";
import LearningPrograms from "./Components/Home/More";
import Footer from "./Components/Common/Footer";
import NewsletterSubscribe from "./Components/Home/NewsLetter";

const index = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutUs />

      <Career />
      <Features />
      <TeamSection />
      {/* <LearningPrograms/> */}
      <NewsletterSubscribe/>
      <Footer/>
    </div>
  );
};

export default index;
