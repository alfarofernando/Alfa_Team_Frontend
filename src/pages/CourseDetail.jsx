// src/components/CourseDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import alfateamQR from "../../public/alfateamQR.jpeg";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses, loading, error } = useCourses();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 text-center">
          Cargando detalles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600 text-center">
          Error al cargar los detalles del curso
        </p>
      </div>
    );
  }

  const course = courses.find((course) => course.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600 text-center">
          Curso no encontrado
        </p>
      </div>
    );
  }

  const paymentLink = "https://mpago.li/1CwqHvE";
  const userEmail = "alfateamventas@gmail.com";

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-64 object-cover"
        src={course.image}
        alt={course.title}
      />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {course.title}
        </h2>
        <p className="text-gray-600 mb-4 text-center">{course.description}</p>
        <div className="flex justify-center gap-6 mb-4">
          <p className="text-gray-800 font-semibold">
            <span className="text-gray-500">Categoría:</span> {course.category}
          </p>
          <p className="text-gray-800 font-semibold">
            <span className="text-gray-500">Nivel:</span> {course.level}
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-md mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Completa el pago:
          </h3>
          <div className="flex flex-col items-center">
            <img
              src={alfateamQR}
              alt="Código QR de pago"
              className="w-48 h-48 mb-4 border-2 border-gray-300 rounded"
            />
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-4"
            >
              Ir al Pago
            </a>
            <p className="text-gray-600 text-sm">
              También puedes enviar un correo a{" "}
              <span className="font-semibold text-gray-800">{userEmail}</span>{" "}
              indicando tu nombre y el curso deseado. Un administrador
              habilitará el acceso en menos de 48 horas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
