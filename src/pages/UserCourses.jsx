// src/components/UserCourses.jsx
import React from "react";
import { useUserCourses } from "../hooks/UseUserCourses";
import { useNavigate } from "react-router-dom";

const UserCourses = () => {
  const { courses, loading, error } = useUserCourses();
  const navigate = useNavigate();

  console.log("cursos: ", courses);
  // Mensaje mientras se cargan los cursos
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Cargando cursos...
        </p>
      </div>
    );
  }

  // Mostrar error si ocurre un problema al obtener los cursos
  if (error) {
    console.error("Error al cargar cursos:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  // Mensaje cuando no hay cursos disponibles
  if (!courses.length) {
    console.warn("No se encontraron cursos para mostrar.");
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No tienes cursos habilitados.
        </p>
      </div>
    );
  }

  // Manejo de navegación al detalle de un curso
  const handleCourseClick = (courseId) => {
    console.log("Navegando al detalle del curso con ID:", courseId);
    navigate(`/LearnCourse/${courseId}`);
  };

  // Renderizado de los cursos
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => {
        return (
          <div
            key={course.id}
            className="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {course.title}
            </h3>
            <p className="mt-2 text-gray-600">
              {course.description || "Sin descripción disponible"}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-gray-500">
                Nivel: {course.level || "No especificado"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCourses;
