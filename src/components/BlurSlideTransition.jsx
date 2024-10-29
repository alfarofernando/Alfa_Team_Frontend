import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const BlurSlideTransition = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Comienza la transición de salida
    setIsTransitioning(true);

    const timeoutId = setTimeout(() => {
      setIsTransitioning(false); // Finaliza transición
      setIsVisible(true); // Muestra el nuevo contenido
    }, 300); // Menor duración para animaciones más rápidas

    return () => {
      clearTimeout(timeoutId);
      setIsVisible(false); // Oculta el componente saliente
    };
  }, [location]);

  return (
    <div
      className={`absolute w-full h-full transition-all duration-300 ease-in-out transform ${
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } ${darkMode ? "bg-black" : "bg-white"}`}
      style={{ willChange: "opacity, transform" }} // Mejora rendimiento
    >
      {isVisible && <div className="w-full h-full">{children}</div>}
    </div>
  );
};

export default BlurSlideTransition;
