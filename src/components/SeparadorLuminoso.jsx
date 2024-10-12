import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import "../styles/navbar-styles.css";

export default function SeparadorLuminoso() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={` rounded-full mx-4 my-6 lg:p-1 md:p-0.5 sm:py-px transition-all duration-100 ${
        darkMode
          ? "bg-gradient-dark bg-opacity-80 text-[#ecf0f1] animate-background"
          : "bg-gradient-light bg-opacity-70 text-[#2c3e50] animate-background"
      }`}
    ></div>
  );
}
