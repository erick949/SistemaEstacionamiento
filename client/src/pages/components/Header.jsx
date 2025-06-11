import { useState, useRef, useEffect } from "react";
import Login from "../Login";
import UserFormCliente from "../UserFormCliente";
import "./Header.css"; // Asegúrate de tener este archivo CSS para los estilos

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "login" o "register"
  const modalRef = useRef();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detectar scroll para ocultar/mostrar el header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <>
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${showHeader ? "visible" : "hidden"}`}
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="#hero" className="logo d-flex align-items-center">
            <h1 className="sitename">Imperial</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#team">Team</a></li>
              <li className="dropdown">
                <a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="header-buttons" style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              <button onClick={() => openModal("login")} className="btn btn-login">Log in</button>
              <button onClick={() => openModal("register")} className="btn btn-register">Sign up</button>
            </div>

            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>

      {/* Modal */}
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
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", background: "#222", padding: "2rem", borderRadius: "8px", minWidth: "300px" }}
          >
            <button
              onClick={closeModal}
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
              aria-label="Cerrar modal"
            >
              &times;
            </button>

            {modalType === "login" && <Login />}
            {modalType === "register" && <UserFormCliente />}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
