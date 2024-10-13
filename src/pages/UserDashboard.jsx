// src/pages/UserDashboard.jsx
import React from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirige al login tras cerrar sesión
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.username}</h1>
        <p className="text-gray-600 mb-6">¡Estamos contentos de verte de nuevo!</p>

        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            Mis Cursos
          </button>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
            Retos Completados
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
