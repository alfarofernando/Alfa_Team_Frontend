import React from "react"; // Agrega esta línea
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
/* <StrictMode>
    <BrowserRouter>
      <ThemeProvider> --habilita el modo oscuro
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode> */
