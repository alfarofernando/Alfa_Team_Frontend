import { createContext, useState } from "react";

// creacion de contexto
export const ThemeContext = createContext();

// crear el proveedor del contexto para manejar el estado global
//es el que se va a utilizar como wrapper.
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
