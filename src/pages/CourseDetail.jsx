import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import alfateamQR from "../../public/alfateamQR.jpeg";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLessons, setShowLessons] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(
          `http://proyecto-alfa.local/course/${courseId}`
        );
        if (!response.ok) throw new Error("Error al obtener las lecciones.");
        const data = await response.json();
        setLessons(data.lessons || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (coursesLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (coursesError || error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">
          {coursesError || error}
        </p>
      </div>
    );
  }

  const course = courses.find((c) => c.id.toString() === courseId);
  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          Curso no encontrado.
        </p>
      </div>
    );
  }

  const paymentLink = "https://mpago.li/1CwqHvE";
  const userEmail = "alfateamventas@gmail.com";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Botón de volver */}
      <button
        onClick={() => navigate("/Cursos")}
        className="absolute top-4 right-4 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
      >
        ← Volver
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Información del curso */}
        <img
          className="w-full h-64 object-cover mb-6 rounded"
          src={course.image}
          alt={course.title}
        />
        <h1 className="text-3xl font-bold text-center mb-4">{course.title}</h1>
        <p className="text-gray-700 text-center mb-6">{course.description}</p>
        <div className="flex justify-between gap-6 mb-6">
          <p className="text-gray-800 font-semibold">
            <span className="text-gray-500">Categoría:</span> {course.category}
          </p>
          <p className="text-gray-800 font-semibold">
            <span className="text-gray-500">Nivel:</span> {course.level}
          </p>
        </div>
        <p className="text-xl font-bold text-green-600 text-center mb-6">
          Precio: $20.000
        </p>

        {/* Desplegable de lecciones */}
        <div>
          <h2
            onClick={() => setShowLessons(!showLessons)}
            className="text-2xl font-bold cursor-pointer mb-4 text-center"
          >
            {showLessons ? "Ocultar Temario" : "Ver Temario"}
          </h2>
          {showLessons && (
            <ol className="list-disc list-inside text-gray-800 text-left">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="mb-2">
                  {lesson.title}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Sección de pago */}
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
