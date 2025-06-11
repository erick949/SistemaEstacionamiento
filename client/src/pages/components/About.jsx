function About() {
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          Learn more about who we are and why we are the best choice for safe and reliable parking.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img src="src/assets/img/about.jpg" className="img-fluid" alt="About Us" />
          </div>

          <div
            className="col-lg-6 order-2 order-lg-1 content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>Your comfort and vehicle safety are our priorities</h3>
            <p className="fst-italic">
              We are a smart parking facility committed to providing efficient, secure, and accessible service to all our clients.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>24/7 surveillance and high-definition security cameras.</span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>Book and pay through our mobile app or website.</span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>
                  Spacious parking spots, clear signage, and friendly service for a stress-free experience.
                </span>
              </li>
            </ul>
            <a href="#" className="read-more">
              <span>Learn More</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
