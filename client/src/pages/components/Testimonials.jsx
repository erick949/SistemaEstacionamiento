import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "I always park here when I go downtown. It's clean, safe, and the staff is super helpful. I love being able to book online!",
    name: "Michael Davis",
    title: "Business Professional",
    image: "assets/img/testimonials/testimonials-1.jpg",
  },
  {
    quote:
      "This parking lot saved me so much time. Real-time space availability and fast entry make my daily routine easier.",
    name: "Samantha Lee",
    title: "Frequent Commuter",
    image: "assets/img/testimonials/testimonials-2.jpg",
  },
  {
    quote:
      "As an EV owner, I really appreciate the charging stations. It's great to leave my car and come back to a full battery.",
    name: "Carlos Rivera",
    title: "Electric Vehicle Owner",
    image: "assets/img/testimonials/testimonials-3.jpg",
  },
  {
    quote:
      "The mobile app is intuitive and lets me handle all payments and invoices automatically. Very professional service.",
    name: "Emily Nguyen",
    title: "Tech Entrepreneur",
    image: "assets/img/testimonials/testimonials-4.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>See what our customers are saying about their experience with our parking services.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className="init-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        <span>{testimonial.quote}</span>
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.title}</h4>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img
                      src={testimonial.image}
                      className="img-fluid testimonial-img"
                      alt={testimonial.name}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
