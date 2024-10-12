import React from "react";
import { Routes, Route } from "react-router-dom";
import BlurSlideTransition from "../components/BlurSlideTransition.jsx";
import Home from "../pages/Home";
import Nosotros from "../pages/Nosotros";
import Cursos from "../pages/Cursos.jsx";
import Retos from "../pages/Retos.jsx";
import Contacto from "../pages/Contacto.jsx";
import Login from "../pages/Login.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BlurSlideTransition>
            <Home />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Nosotros"
        element={
          <BlurSlideTransition>
            <Nosotros />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Cursos"
        element={
          <BlurSlideTransition>
            <Cursos />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Retos"
        element={
          <BlurSlideTransition>
            <Retos />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Contacto"
        element={
          <BlurSlideTransition>
            <Contacto />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Login"
        element={
          <BlurSlideTransition>
            <Login />
          </BlurSlideTransition>
        }
      />
    </Routes>
  );
}
