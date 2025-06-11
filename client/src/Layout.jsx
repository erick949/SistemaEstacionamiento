import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
