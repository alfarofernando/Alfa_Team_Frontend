import React, { useState, useContext } from "react";
import "../styles/navbar-styles.css";
import { UserAuthContext } from "../context/UserAuthContext";
import { linkStyles } from "../utils/Styles";
import { NavLink } from "react-router-dom";
import Rain from "./Rain";
import LogoutButton from "./LogoutButton.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú hamburguesa
  const { user, logout } = useContext(UserAuthContext);

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
      <nav className="z-10 lg:p-4 md:p-2 sm:p-1 transition-all duration-[2000ms] ease-in-out bg-gradient-light bg-opacity-70 text-[#2c3e50] animate-background">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="mx-2 lg:text-3xl md:text-xl sm:text-md font-bold shake-hover">
            Alfa_Team
          </div>

          {/* Menú Hamburguesa */}
          <div className="relative group lg:hidden">
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-16 h-16 cursor-pointer flex flex-col justify-center items-center space-y-1 transform transition duration-500 ease-in-out"
            >
              <span className="block w-8 h-0.5 bg-black"></span>
              <span className="block w-8 h-0.5 bg-black"></span>
              <span className="block w-8 h-0.5 bg-black"></span>
            </div>

            {/* Links del Menú */}
            {menuOpen && (
              <div className="absolute right-0 top-10 rounded-lg shadow-lg p-6 space-y-4 z-50 text-lg text-center transition-all duration-200 bg-black text-white">
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
