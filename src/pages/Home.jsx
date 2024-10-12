import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Tarjeta from "../components/Tarjeta";
import Separador from "../components/Separador";

import Footer from "../components/Footer";

export default function Home() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`relative z-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-4 p-4 ${
          darkMode ? "bg-dark" : "bg-gray-100"
        }`}
      >
        <Tarjeta
          titulo="Coliseo del Codigo"
          imagen1="../../public/gladiador1.webp"
          imagen2="../../public/gladiador2.jpeg"
          info="Alza tu teclado gladiador, compite por la gloria y una coca-cola"
          direccion=""
          className="lg:col-span-2 lg:col-start-1 md:col-span-1"
        />
        <Tarjeta
          titulo="Nosotros"
          imagen1="../../public/bros.jpg"
          imagen2="../../public/bros2.jpg"
          info="Conoce al Dream Team"
          direccion=""
          className="lg:col-span-1 lg:col-start-3 md:col-span-1"
        />
      </div>
      <Separador />
      <div
        className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 p-4 ${
          darkMode ? "bg-dark" : "bg-gray-100"
        }`}
      >
        <Tarjeta
          titulo="Curso 1"
          imagen1="../../public/pc-sana.jpg"
          imagen2="../../public/pc-llamas.jpg"
          info="fundamentos"
          direccion=""
          className="lg:col-span-1 lg:col-start-1 md:col-span-1"
        />
        <Tarjeta
          titulo="Curso 2"
          imagen1="../../public/pc-sana2.png"
          imagen2="../../public/pc-llamas2.avif"
          info="intermedio"
          direccion=""
          className="lg:col-span-1 lg:col-start-2 md:col-span-1"
        />
        <Tarjeta
          titulo="Curso 3"
          imagen1="../../public/pc-sana3.jpg"
          imagen2="../../public/pc-llamas3.jpg"
          info="avanzado"
          direccion=""
          className="lg:col-span-1 lg:col-start-3 md:col-span-2 "
        />
      </div>
      <Separador />

      <Footer />
    </>
  );
}
