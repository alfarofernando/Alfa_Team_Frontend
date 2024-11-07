import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // Importamos el contexto para dark mode

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useContext(ThemeContext); // Accedemos al contexto de darkMode
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Cargar los datos del usuario desde la base de datos al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `http://proyecto-alfa.local/api/user/${user.email}`
      );
      const data = await response.json();
      setUserData(data); // Asignar los datos del usuario al estado
    };

    fetchUserData();
  }, [user.email]);

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirige al login tras cerrar sesión
  };

  const handleUpdateUser = () => {
    // Lógica para actualizar los datos del usuario
    alert("Botón para actualizar información del usuario.");
  };

  // Clases dinámicas para dark mode
  const backgroundColor = darkMode ? "bg-gray-900" : "bg-gray-100";
  const sidebarColor = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const buttonColor = darkMode
    ? "bg-blue-700 hover:bg-blue-800"
    : "bg-blue-500 hover:bg-blue-600";
  const cardColor = darkMode ? "bg-gray-800" : "bg-white";
  const buttonTextColor = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`${backgroundColor} min-h-screen flex`}>
      {/* Sidebar */}
      <div className={`${sidebarColor} w-64 text-white p-6 flex flex-col`}>
        <h2 className="text-xl font-bold mb-8">Menú</h2>
        <ul className="space-y-4">
          <li>
            <button className={`${buttonColor} w-full py-2 px-4 rounded`}>
              Mis Cursos
            </button>
          </li>
          <li>
            <button className={`${buttonColor} w-full py-2 px-4 rounded`}>
              Retos Completados
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded mt-6"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow p-8">
        <div
          className={`${cardColor} shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto`}
        >
          <h1 className={`${textColor} text-2xl font-bold mb-4`}>
            Bienvenido, {userData?.username}
          </h1>
          <p className={`${textColor} text-gray-600 mb-6`}>
            ¡Estamos contentos de verte de nuevo!
          </p>

          <div className="space-y-6">
            {userData ? (
              <>
                <div className="flex justify-between">
                  <p className={`${textColor} text-gray-700`}>
                    Nombre: {userData.name}
                  </p>
                  <p className={`${textColor} text-gray-700`}>
                    Email: {userData.email}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className={`${textColor} text-gray-700`}>
                    Rol: {userData.isAdmin ? "Administrador" : "Usuario"}
                  </p>
                </div>
                <button
                  onClick={handleUpdateUser}
                  className={`w-full ${buttonColor} ${buttonTextColor} py-2 rounded-lg mt-6`}
                >
                  Actualizar Información
                </button>
              </>
            ) : (
              <p>Cargando datos...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
