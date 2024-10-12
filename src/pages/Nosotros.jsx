import { useContext } from "react";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import SeparadorLuminoso from "../components/SeparadorLuminoso";
import { nosotrosImagenEstilos } from "../utils/Styles.js";

export default function Nosotros() {
  const { darkMode } = useContext(ThemeContext);

  const imageStyles = `${nosotrosImagenEstilos} ${
    darkMode
      ? "shadow-stone-700  hover:shadow-stone-50 opacity-85"
      : "shadow-stone-400  hover:shadow-stone-900 opacity-95"
  }`;

  return (
    <>
      <div
        className={`relative  overflow-hidden z-10 mt-4 mx-8 ${
          darkMode ? "bg-dark text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          {/* primera columna */}
          <div className="mt-8 justify-center">
            <h2 className="text-center mb-4 text-lg lg:text-3xl md:text-2xl font-bold">
              Nuestro equipo{" "}
            </h2>
            <p className="justify-around text-md lg:text-xl md:text-lg">
              Somos un grupo dinámico de personas apasionadas por lo que hacemos
              y comprometidas en ofrecer los mejores resultados para nuestros
              clientes. Creemos en el poder de la educación y la programación
              como herramientas para el cambio y la mejora continua. Nuestra
              misión es proporcionar cursos de calidad y desafíos de
              programación que motiven a nuestra comunidad a aprender, crecer y
              alcanzar su máximo potencial.
            </p>
          </div>
          {/* segunda columna */}
          <div className=" my-4">
            <div className="flex flex-col items-center">
              <img src="../../public/fort.avif" className={imageStyles} />
              <p className="font-bold text-lg lg:text-2xl md:text-xl sm:text-lg">
                Richard Fort
              </p>
              <p>El Comandante</p>
              <p className="my-4 justify-around text-md lg:text-xl md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis minus eius, debitis cum recusandae praesentium, eum
                architecto, officia nostrum suscipit sit sequi. Sunt
                reprehenderit quia voluptates labore quibusdam suscipit alias!
              </p>
            </div>
            <SeparadorLuminoso />
            <div className="flex flex-col items-center">
              <img src="../../public/lizzi.avif" className={imageStyles} />
              <p className="font-bold text-lg lg:text-2xl md:text-xl sm:text-lg">
                Lizzi Tagliani
              </p>
              <p>Conductora mas famosa</p>
              <p className="my-4 justify-around text-md lg:text-xl md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                voluptates, eius id facere architecto maxime harum inventore
                distinctio explicabo vero, officia iste non dolore enim nihil
                facilis omnis reprehenderit veritatis.
              </p>
            </div>
          </div>
          {/* tercera columna */}
          <div className="my-4">
            <div className="flex flex-col items-center">
              <img src="../../public/bananero.webp" className={imageStyles} />
              <p className="font-bold text-lg lg:text-2xl md:text-xl sm:text-lg">
                Bananero Bananita
              </p>
              <p>Fundador Cervezas Japi</p>
              <p className="my-4 justify-around text-md lg:text-xl md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                qui expedita eius dignissimos laboriosam magni maxime
                reprehenderit veniam cupiditate delectus enim nam, dolore
                dolorum aperiam deserunt atque blanditiis impedit corporis!
              </p>
            </div>
            <SeparadorLuminoso />
            <div className="flex flex-col items-center">
              <img src="../../public/florv.webp" className={imageStyles} />
              <p className="font-bold text-lg lg:text-2xl md:text-xl sm:text-lg">
                Florencia De La V
              </p>
              <p>Actor/Actriz/Actir/Acter</p>
              <p className="my-4 justify-around text-md lg:text-xl md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                qui expedita eius dignissimos laboriosam magni maxime
                reprehenderit veniam cupiditate delectus enim nam, dolore
                dolorum aperiam deserunt atque blanditiis impedit corporis!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
