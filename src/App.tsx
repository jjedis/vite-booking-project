import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const hash = location.hash;
    const scrollToTarget = () => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    // wait a tick so the destination page has mounted
    const raf = requestAnimationFrame(scrollToTarget);

    // the destination page may still be fetching data (e.g. the services
    // list), which changes its height once it renders in and throws off
    // the scroll position - keep re-aligning while the layout is settling
    const resizeObserver = new ResizeObserver(scrollToTarget);
    resizeObserver.observe(document.body);

    const stopCorrecting = setTimeout(() => resizeObserver.disconnect(), 1500);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      clearTimeout(stopCorrecting);
    };
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
