import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { linkStyles } from "../utils/Styles";
import SeparadorLuminoso from "./SeparadorLuminoso";
import SocialMediaSVG from "./SocialMediaSVG";
import { pathD } from "../utils/svg.js";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <SeparadorLuminoso />
      <div
        className={`relative shadow-lg p-4 space-y-4 z-50 text-lg text-center transition-all duration-500 hover:text-xl ${
          darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
        }`}
      >
        {/* lista enlaces a secciones de la aplicacion */}
        <ul className={`flex my-2 p-4 justify-center gap-6`}>
          <li className={linkStyles}>
            <a href="">Nosotros</a>
          </li>
          <li className={linkStyles}>
            <a href="">FAQs</a>
          </li>
          <li className={linkStyles}>
            <a href="">Cursos</a>
          </li>
          <li className={linkStyles}>
            <a href="">Contacto</a>
          </li>
          <li className={linkStyles}>
            <a href="">Coliseo</a>
          </li>
        </ul>
        {/* inicio enlaces a redes sociales con SVG */}
        <ul className={`flex my-2 p-4 justify-center gap-6 hover:scale-250`}>
          <li className={linkStyles}>
            <SocialMediaSVG
              href="https://www.linkedin.com/"
              rel="noopener noreferrer"
              className="w-8 h-8"
              pathD={pathD.Linkedin}
            />
          </li>
          <li className={linkStyles}>
            <SocialMediaSVG
              href="https://www.facebook.com/"
              rel="noopener noreferrer"
              className="w-8 h-8"
              pathD={pathD.Facebook}
            />
          </li>
          <li className={linkStyles}>
            <SocialMediaSVG
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              className="w-8 h-8"
              pathD={pathD.Instagram}
            />
          </li>
          <li className={linkStyles}>
            <SocialMediaSVG
              href="https://github.com/"
              rel="noopener noreferrer"
              className="w-8 h-8"
              pathD={pathD.Github}
            />
          </li>
        </ul>
        <p className="text-center my-2 p-5">
          © 2024 Alfa Team Inc. , All rights reserved.
        </p>
      </div>
    </>
  );
}
