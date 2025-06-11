import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from "typed.js";
import "./Hero.css";

function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const typedElement = document.querySelector(".typed");
    if (typedElement) {
      new Typed(typedElement, {
        strings: typedElement.getAttribute("data-typed-items").split(","),
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      });
    }
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <img
        src="src\assets\img\hero-bg.jpg"
        className="hero-bg"
        alt="Hero background"
        data-aos="fade-in"
      />

      <div className="container text-center" data-aos="fade-up" data-aos-delay="100">
        <img
          src="/src/assets/img/logo.png"
          className="img-fluid mb-3"
          alt="Imperial Logo"
        />
        <h2>Welcome to Imperial Parking</h2>
        <p>
          We create{" "}
          <span
            className="typed"
            data-typed-items="Fast Reservations, Safe Parking, Real-Time Availability"

          ></span>
        </p>
        <div>
          <a href="#about" className="cta-btn">Get Started</a>
          <a href="#services" className="cta-btn2">Our Services</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
