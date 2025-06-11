import { useState, useRef } from "react";
import Login from "../Login"; // Asegúrate de que la ruta sea correcta
import UserFormCliente from "../UserFormCliente";

function CallToAction() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const handleOpenModal = () => {
    console.log("Botón presionado ✅");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Modal cerrado ✅");
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Sección principal */}
      <section
        id="call-to-action"
        className="call-to-action section dark-background"
        style={{ position: "relative", padding: "4rem 1rem", textAlign: "center", backgroundColor: "#1a1a1a", color: "#fff" }}
      >
        <img
          src="assets/img/cta-bg.jpg"
          alt="Parking Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            opacity: 0.3,
          }}
        />

        <div className="container">
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Reserve your spot now</h3>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
            Avoid complications and park with peace of mind. Reserve your spot online in seconds and enjoy a safe, fast, and contactless parking experience.
          </p>
         <button onClick={handleOpenModal} className="cta-btn2">
              Register Now
            </button>



        </div>
      </section>

      {/* Modal flotante */}
      {showModal && (
        <div
          className="modal-overlay"
          
          onClick={handleClickOutside}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div ref={modalRef} onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
            {/* Botón de cerrar */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "-2rem",
                right: "-2rem",
                background: "transparent",
                border: "none",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            {/* Componente Login estilizado internamente */}
            <Login />
          </div>



       



          
        </div>
      )}
    </>
  );
}

export default CallToAction;
