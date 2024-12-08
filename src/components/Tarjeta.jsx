import React, { useState } from "react";

export default function Tarjeta({
  titulo,
  imagen1, // Imagen de fondo
  imagen2, // Imagen que aparece al hacer hover
  info,
  direccion,
  className,
}) {
  const [hovered, setHovered] = useState(false); // Estado para manejar el hover

  return (
    <div
      className={`relative rounded-lg shadow-lg content-center shadow-stone-400 hover:shadow-stone-900 opacity-95 transition-transform duration-300 ease-in-out overflow-hidden ${className} h-48 sm:h-48 md:h-64 lg:h-80 xl:h-96`} // Mantener altura específica
      onMouseEnter={() => setHovered(true)} // Cambia el estado al entrar
      onMouseLeave={() => setHovered(false)} // Cambia el estado al salir
    >
      {/* Capa de imagen de fondo */}
      <img
        src={imagen1}
        alt={titulo}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Capa de imagen que aparece al hacer hover */}
      <img
        src={imagen2}
        alt={titulo}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          hovered ? "opacity-99" : "opacity-0"
        }`}
      />

      {/* Capa semi-transparente para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-lg bg-black" />

      {/* Contenido de la tarjeta */}
      <a href={direccion} className="relative z-20 p-4 text-center shadow-2xl">
        <h2 className="lg:text-3xl md:text-2xl sm:text-lg font-extrabold md:font-bold text-white">
          {titulo}
        </h2>
        <p className="font-extrabold lg:text-2xl md:text-xl md:font-bold sm:text-md py-4 text-white shadow">
          {info}
        </p>
      </a>
    </div>
  );
}
