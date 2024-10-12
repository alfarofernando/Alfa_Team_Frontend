import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./context/ThemeContext.jsx";
import AppRouter from "./router/Router.jsx";
import "./styles/Rain.css";
import "./styles/fullBackground.css";

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`full-background scroll-background ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Navbar />
      <AppRouter />
    </div>
  );
}
