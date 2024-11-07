import { createContext, useState, useContext, useEffect } from "react";

// creacion de contexto
export const UserAuthContext = createContext();

// crear el proveedor del contexto para manejar el estado global
//es el que se va a utilizar como wrapper.
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta obtener el usuario desde localStorage al cargar la app
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Guarda el usuario en localStorage cada vez que cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, isAdmin) => {
    setUser({ email, isAdmin });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);
