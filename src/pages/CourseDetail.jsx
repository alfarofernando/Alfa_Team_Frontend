// src/components/CourseDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../hooks/useCourses"; // Importamos el hook para acceder a los cursos

const CourseDetail = () => {
  const { courseId } = useParams(); // Obtenemos el id del curso desde los parámetros de la URL
  const { courses, loading, error } = useCourses(); // Usamos el hook para acceder a los cursos

  // Comprobamos si los datos están cargando
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Cargando detalles...
        </p>
      </div>
    );
  }

  // Comprobamos si ocurrió un error al cargar los cursos
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Error al cargar los detalles del curso
        </p>
      </div>
    );
  }

  // Buscamos el curso con el id correspondiente
  const course = courses.find((course) => course.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Curso no encontrado
        </p>
      </div>
    );
  }

  // Mensaje personalizado que se importará más adelante
  const customMessage = "¡Bienvenido a los detalles de este curso!";

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={course.image}
        alt={course.title}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <p className="text-gray-800 font-semibold mt-2">
          Categoría: {course.category}
        </p>
        <p className="text-gray-800 font-semibold mt-2">
          Nivel: {course.level}
        </p>

        {/* Mensaje personalizado importado */}
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold text-gray-800">{customMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
