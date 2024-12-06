import React, { useState, useEffect, useContext } from "react";
import "../styles/navbar-styles.css";
import { ThemeContext } from "../context/ThemeContext";
import { UserAuthContext } from "../context/UserAuthContext";
import { linkStyles } from "../utils/Styles";
import { NavLink } from "react-router-dom";
import Rain from "./Rain";
import LogoutButton from "./LogoutButton.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú hamburguesa
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(UserAuthContext);

  // Aplicar el modo oscuro
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const renderLinks = () => {
    if (user && user.isAdmin) {
      return (
        <>
          <li>
            <NavLink to="/" className={linkStyles}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/course-list" className={linkStyles}>
              Cursos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-lesson-access" className={linkStyles}>
              Accesos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports" className={linkStyles}>
              Reportes
            </NavLink>
          </li>
          <li>
            <NavLink to="/Retos" className={linkStyles}>
              Retos
            </NavLink>
          </li>
          <li>
            <NavLink to="/AdminDashboard" className={linkStyles}>
              Panel
            </NavLink>
          </li>
          <li>
            <LogoutButton logout={logout} />
          </li>
        </>
      );
    } else if (user) {
      return (
        <>
          <li>
            <NavLink to="/" className={linkStyles}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/UserCourses" className={linkStyles}>
              Aprendizaje
            </NavLink>
          </li>
          <li>
            <NavLink to="/Cursos" className={linkStyles}>
              Comprar
            </NavLink>
          </li>
          <li>
            <NavLink to="/UserDashboard" className={linkStyles}>
              Mi Perfil
            </NavLink>
          </li>
          <li>
            <LogoutButton logout={logout} />
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/" className={linkStyles}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/Cursos" className={linkStyles}>
              Cursos
            </NavLink>
          </li>
          <li>
            <NavLink to="/Retos" className={linkStyles}>
              Retos
            </NavLink>
          </li>
          <li>
            <NavLink to="/Login" className={linkStyles}>
              Iniciar Sesión
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <Rain />
      <nav
        className={`z-10 lg:p-4 md:p-2 sm:p-1 transition-all duration-[2000ms] ease-in-out ${
          darkMode
            ? "bg-gradient-dark bg-opacity-80 text-[#ecf0f1] animate-background"
            : "bg-gradient-light bg-opacity-70 text-[#2c3e50] animate-background"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="mx-2 lg:text-3xl md:text-xl sm:text-md font-bold shake-hover">
            Alfa_Team
          </div>

          {/* Botón Modo Claro/Oscuro */}
          <button
            onClick={toggleDarkMode}
            className="relative w-12 h-12 flex items-center justify-end focus:outline-none -ml-1"
          >
            {/* Ícono de Sol */}
            <span
              className={`absolute transform transition-all duration-[2000ms] ease-in-out hover:scale-125  ${
                darkMode
                  ? "-translate-x-12 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            </span>

            {/* Ícono de Luna */}
            <span
              className={`absolute transform transition-all duration-900 ease-in-out hover:scale-125 ${
                darkMode
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.752 15.002A9 9 0 1112.998 2.25 7.001 7.001 0 0021.752 15.002z" />
              </svg>
            </span>
          </button>

          {/* Menú Hamburguesa */}
          <div className="relative group lg:hidden">
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-16 h-16 cursor-pointer flex flex-col justify-center items-center space-y-1 transform transition duration-500 ease-in-out"
            >
              <span
                className={`block w-8 h-0.5 ${
                  darkMode ? "bg-white" : "bg-black"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 ${
                  darkMode ? "bg-white" : "bg-black"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 ${
                  darkMode ? "bg-white" : "bg-black"
                }`}
              ></span>
            </div>

            {/* Links del Menú */}
            {menuOpen && (
              <div
                className={`absolute right-0 top-10 rounded-lg shadow-lg p-6 space-y-4 z-50 text-lg text-center transition-all duration-200 ${
                  darkMode ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                <ul className="flex flex-col space-y-2">{renderLinks()}</ul>
              </div>
            )}
          </div>

          {/* Links para pantallas grandes */}
          <div className="hidden lg:flex space-x-8 m-2 rounded">
            <ul className="flex space-x-4">{renderLinks()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
}
