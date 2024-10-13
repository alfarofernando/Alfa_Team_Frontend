// src/pages/AdminCourseList.jsx
import React, { useState } from "react"; // Asegúrate de importar useState
import { useNavigate } from "react-router-dom";
import dummy_course_data from "../utils/dummy_course_data"; // Asegúrate de tener tus datos de cursos

export default function AdminCourseList() {
  const [courses, setCourses] = useState(dummy_course_data); // Asigna datos iniciales de cursos
  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate("/admin/add-course"); // Navega al formulario de agregar curso
  };

  const handleEditCourse = (courseId) => {
    navigate(`/admin/edit-course/${courseId}`); // Navega al formulario de editar curso
  };

  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses); // Eliminar curso de la lista
    alert("Curso eliminado."); // Mensaje de confirmación (puedes usar un modal)
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">Cursos Disponibles</h2>
      <button onClick={handleAddCourse} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Agregar Curso
      </button>
      <ul className="mt-4">
        {courses.map(course => (
          <li key={course.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded">
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p>{course.description}</p>
            </div>
            <div>
              <button onClick={() => handleEditCourse(course.id)} className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-lg">
                Editar
              </button>
              <button onClick={() => handleDeleteCourse(course.id)} className="ml-2 bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded-lg">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
