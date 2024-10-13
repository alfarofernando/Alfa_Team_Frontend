// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import dummy_course_data from "../utils/dummy_course_data"; // Importar datos de ejemplo

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(dummy_course_data);

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirige al login tras cerrar sesión
  };

  const handleViewCourses = () => {
    navigate("/admin/course-list"); // Navega a la lista de cursos
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        <p className="text-gray-700 mb-8">Hola, {user.username}. Administra los recursos del sitio.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={handleViewCourses} className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
            Ver Cursos
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg">
            Ver Retos
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg">
            Reportes
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
}
export default AdminDashboard;
