import React from "react";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portafolio</h2>
        <p>Needs met with unique and creative solutionss</p>
      </div>

      <div className="container">
        <div
          className="isotope-layout"
          data-default-filter="*"
          data-layout="masonry"
          data-sort="original-order"
        >
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <li data-filter="*" className="filter-active">Todo</li>
            <li data-filter=".filter-app">Aplicaciones</li>
            <li data-filter=".filter-product">Productos</li>
            <li data-filter=".filter-branding">Branding</li>
            <li data-filter=".filter-books">Libros</li>
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            {[
              { category: "app", img: "app-1.jpg", title: "Aplicación 1" },
              { category: "product", img: "product-1.jpg", title: "Producto 1" },
              { category: "branding", img: "branding-1.jpg", title: "Branding 1" },
              { category: "books", img: "books-1.jpg", title: "Libro 1" },
              { category: "app", img: "app-2.jpg", title: "Aplicación 2" },
              { category: "product", img: "product-2.jpg", title: "Producto 2" },
              { category: "branding", img: "branding-2.jpg", title: "Branding 2" },
              { category: "books", img: "books-2.jpg", title: "Libro 2" },
              { category: "app", img: "app-3.jpg", title: "Aplicación 3" },
              { category: "product", img: "product-3.jpg", title: "Producto 3" },
              { category: "branding", img: "branding-3.jpg", title: "Branding 3" },
              { category: "books", img: "books-3.jpg", title: "Libro 3" }
            ].map(({ category, img, title }, i) => (
              <div
                key={i}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${category}`}
              >
                <img
                  src={`assets/img/portfolio/${img}`}
                  className="img-fluid"
                  alt={title}
                />
                <div className="portfolio-info">
                  <h4>{title}</h4>
                  <p>Where vision meets execution</p>
                  <a
                    href={`assets/img/portfolio/${img}`}
                    title={title}
                    data-gallery={`portfolio-gallery-${category}`}
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    title="Más detalles"
                    className="details-link"
                  >
                    <i className="bi bi-link-45deg"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
