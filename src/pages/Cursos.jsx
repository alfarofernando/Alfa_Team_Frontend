// src/components/Cursos.jsx
import React from "react";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom";

function Cursos() {
  const { courses, loading, error } = useCourses();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Cargando cursos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Error al cargar cursos
        </p>
      </div>
    );
  }

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`); // Redirige al detalle del curso usando el id
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
          onClick={() => handleCourseClick(course.id)}
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {course.title}
          </h3>
          <p className="mt-2 text-gray-600">{course.description}</p>

          <div className="flex justify-center items-center mt-4 space-x-4">
            <span className="text-sm font-medium text-gray-500">
              Curso nivel: {course.level}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cursos;
