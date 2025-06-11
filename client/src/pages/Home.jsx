import '../assets/css/main.css';

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer.jsx";
import ScrollTop from "./components/ScrollTop.jsx";

import Preloader from "./components/Preloader.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <About />
        <Services />
        <Features />
        <CallToAction />
        <Portfolio />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
      {/* <Preloader /> */}
    </>
  );
}
