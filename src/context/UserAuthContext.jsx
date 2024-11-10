import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <UserAuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);
