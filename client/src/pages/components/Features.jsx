function Features() {
  const features = [
    {
      icon: "bi-award",
      color: "orange",
      title: "24/7 Security",
      description:
        "Our parking lot is monitored around the clock with surveillance cameras and trained personnel.",
      delay: 100,
    },
    {
      icon: "bi-patch-check",
      color: "blue",
      title: "Online Booking",
      description:
        "Reserve your spot easily through our website or mobile app and skip the hassle.",
      delay: 200,
    },
    {
      icon: "bi-sunrise",
      color: "green",
      title: "Eco-Friendly Spaces",
      description:
        "We offer dedicated spots with EV charging stations for electric vehicles.",
      delay: 300,
    },
    {
      icon: "bi-shield-check",
      color: "red",
      title: "Insurance Coverage",
      description:
        "Your vehicle is insured against theft and damage while parked in our facility.",
      delay: 400,
    },
  ];

  return (
    <section id="features" className="features section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Features</h2>
        <p>
          Discover the features that make our parking lot a secure, smart, and convenient choice for all drivers.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {features.map((feature, index) => (
            <div
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay={feature.delay}
              key={index}
            >
              <div className={`feature-box ${feature.color}`}>
                <i className={`bi ${feature.icon}`}></i>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
