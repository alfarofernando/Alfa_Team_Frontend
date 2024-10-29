// src/pages/Reports.jsx
import React from "react";
import { dummyUsers } from "../utils/dummy_login_data"; // Asegúrate de tener el archivo correcto
import dummy_course_data from "../utils/dummy_course_data"; // Importar datos de ejemplo

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Reportes</h1>
        
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <ul className="mb-8">
          {dummyUsers.map((user) => (
            <li key={user.id} className="border-b py-2">
              <span>{user.username}</span> - <span>{user.isAdmin ? 'Administrador' : 'Usuario Regular'}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Cursos</h2>
        <ul>
          {dummy_course_data.map((course) => (
            <li key={course.id} className="border-b py-2">
              <span>{course.title}</span> - <span>{course.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
