function Services() {
  return (
    <section id="services" className="services section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Discover everything we offer to provide you with a safe, fast, and comfortable parking experience.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {[
            {
              icon: "bi-briefcase",
              title: "Secure Parking",
              desc: "Your vehicle is protected with 24/7 surveillance and access controlled by cameras.",
              delay: 100,
            },
            {
              icon: "bi-card-checklist",
              title: "Online Reservations",
              desc: "Reserve your spot through our website or app and avoid unnecessary waiting when you arrive.",
              delay: 200,
            },
            {
              icon: "bi-bar-chart",
              title: "Flexible Rates",
              desc: "We offer hourly, daily, or monthly rates, with special discounts for frequent users.",
              delay: 300,
            },
            {
              icon: "bi-binoculars",
              title: "Real-Time Monitoring",
              desc: "Check available parking spaces in real time online before arriving.",
              delay: 400,
            },
            {
              icon: "bi-brightness-high",
              title: "EV Charging Stations",
              desc: "We provide fast and safe charging stations for electric vehicles.",
              delay: 500,
            },
            {
              icon: "bi-calendar4-week",
              title: "Automatic Billing",
              desc: "Receive your invoice directly by email instantly when exiting the parking lot.",
              delay: 600,
            },
          ].map((service, index) => (
            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay={service.delay}
              key={index}
            >
              <div className="icon flex-shrink-0">
                <i className={`bi ${service.icon}`}></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    {service.title}
                  </a>
                </h4>
                <p className="description">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
