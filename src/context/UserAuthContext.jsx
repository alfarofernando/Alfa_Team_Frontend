import { createContext, useState, useContext } from "react";

// creacion de contexto
export const UserAuthContext = createContext();

// crear el proveedor del contexto para manejar el estado global
//es el que se va a utilizar como wrapper.
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //funcion para loguear un usuario y definir si es administrador

  const login = (username, isAdmin) => {
    setUser({ username, isAdmin });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);
