import { createPortal } from "react-dom";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Rain() {
  const dropsCount = 0; // Número de gotas de lluvia
  const { darkMode } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad
  const [drops, setDrops] = useState([]); // Estado para almacenar las gotas

  useEffect(() => {
    // Establece la visibilidad a true después de 40s
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, 40000);

    // Función para crear gotas
    const generateDrops = () => {
      const newDrops = [];
      for (let i = 0; i < dropsCount; i++) {
        // Determina si la gota será corta o larga
        newDrops.push(
          <div
            key={i}
            className={`drop absolute left-0 bg-[rgba(0,102,204,0.5)] ${
              darkMode
                ? "bg-[rgba(200,200,200,0.5)]"
                : "bg-[rgba(0,102,204,0.5)]"
            } animate-fall`}
            style={{
              left: `${Math.random() * 150}vw`,
              height: `${Math.floor(Math.random() * (30 - 5 + 1) + 5)}px`, // Aplica la altura determinada
              animationDuration: `${Math.random() * 3.5 + 1}s`,
              animationDelay: `${Math.random() * 5 + 1}s`,
              opacity: visible ? 1 : 0, // Cambia la opacidad según la visibilidad
              filter: `blur(${Math.floor(Math.random() * 5) + 1}px)`, // Desenfoque aleatorio
              transition:
                "opacity 9s ease-in-out, height 8s ease-in-out, left 7s ease-in-out ,  filter 6s ease-in-out", // Transición suave para la opacidad, altura, posición y desenfoque
            }}
          />
        );
      }
      setDrops(newDrops);
    };

    // Genera gotas iniciales
    generateDrops();

    // Genera nuevas gotas cada 10s
    const intervalId = setInterval(generateDrops, 10000);

    // Limpieza de los intervalos y timeout al desmontar el componente
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [darkMode, dropsCount, visible]); // Agrega las dependencias necesarias

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0`}
    >
      {drops} {/* Renderiza las gotas almacenadas en el estado */}
    </div>,
    document.getElementById("rain")
  );
}
