import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./context/ThemeContext.jsx";
import AppRouter from "./router/Router.jsx";
import "./styles/Rain.css";
import "./styles/fullBackground.css";

export default function App() {
  return (
    <div className={`bg-gray-100 full-background scroll-background`}>
      <Navbar />
      <AppRouter />
    </div>
  );
}
