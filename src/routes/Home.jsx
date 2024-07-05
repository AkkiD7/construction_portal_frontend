import React from "react";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Constructions from "./Constructions";
import Services from "./Services";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Blogs from "./Blogs";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Constructions />
      <Services />
      <Projects />
      <Testimonials />
      <Blogs />
    </div>
  );
}
