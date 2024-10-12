import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const BlurSlideTransition = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Comienza la animación de salida
    setIsExiting(true);

    // Espera a que termine la animación de salida antes de ocultar el contenido
    const timeoutId = setTimeout(() => {
      setIsExiting(false); // Termina la animación de salida
      setIsVisible(true); // Muestra el nuevo contenido
    }, 1000); // Duración de la animación

    // Limpieza: oculta el contenido anterior al salir
    return () => {
      clearTimeout(timeoutId);
      setIsVisible(false); // Oculta el contenido anterior
    };
  }, [location]);

  return (
    <div
      className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
        isExiting
          ? "translate-x-full opacity-0 blur-sm"
          : "translate-x-0 opacity-100 blur-0"
      } ${darkMode ? "bg-black" : "bg-gray-100"}`}
    >
      {isVisible && (
        <div
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default BlurSlideTransition;
