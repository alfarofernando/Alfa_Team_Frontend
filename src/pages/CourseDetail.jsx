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
        <p className="text-2xl font-semibold text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (coursesError || error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-red-600">
          {coursesError || error}
        </p>
      </div>
    );
  }

  const course = courses.find((c) => c.id.toString() === courseId);
  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-600">
          Curso no encontrado.
        </p>
      </div>
    );
  }

  // Redirigir si el curso no está habilitado
  if (!course.is_enabled) {
    navigate("/Cursos"); // Ajusta la ruta de redirección según lo necesites
    return null; // Evitar renderizar el resto del componente
  }

  // Ordenar las lecciones por order_number
  const sortedLessons = lessons.sort((a, b) => a.order_number - b.order_number);

  const paymentLink = "https://mpago.li/1CwqHvE";
  const userEmail = "alfateamventas@gmail.com";

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Botón de volver */}
      <button
        onClick={() => navigate("/Cursos")}
        className="absolute top-4 right-4 bg-blue-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-600 transition-colors"
      >
        ← Volver
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Información del curso */}
        <img
          className="w-full h-72 object-cover mb-6 rounded"
          src={course.image}
          alt={course.title}
        />
        <h1 className="text-4xl font-bold text-center mb-4">{course.title}</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          {course.description}
        </p>
        <div className="flex justify-between gap-8 mb-6">
          <p className="text-lg text-gray-800 font-semibold">
            <span className="text-gray-500">Categoría:</span> {course.category}
          </p>
          <p className="text-lg text-gray-800 font-semibold">
            <span className="text-gray-500">Nivel:</span> {course.level}
          </p>
        </div>
        <p className="text-2xl font-bold text-green-600 text-center mb-6">
          Precio: $20.000
        </p>

        {/* Desplegable de lecciones */}
        <div>
          <h2
            onClick={() => setShowLessons(!showLessons)}
            className="text-3xl font-bold cursor-pointer mb-4 text-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
          >
            {showLessons ? "Ocultar Temario" : "Ver Temario"}
          </h2>
          {showLessons && (
            <ol className="list-none space-y-4">
              {sortedLessons
                .filter((lesson) => lesson.is_enabled) // Solo renderizar lecciones habilitadas
                .map((lesson) => (
                  <li
                    key={lesson.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow-md transition-all"
                  >
                    {lesson.title}
                  </li>
                ))}
            </ol>
          )}
        </div>

        {/* Sección de pago */}
        <div className="bg-yellow-100 p-8 border-l-4 border-yellow-500 text-yellow-700 rounded mt-8">
          <h3 className="text-2xl font-semibold mb-4">Completa el pago:</h3>
          <div className="flex flex-col items-center">
            <img
              src={alfateamQR}
              alt="Código QR de pago"
              className="w-56 h-56 mb-6 border-4 border-gray-300 rounded"
            />
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors mb-6"
            >
              Ir al Pago
            </a>
            <p className="text-lg text-gray-600 mb-4">
              También debes enviar un correo a{" "}
              <span className="font-semibold text-gray-800">{userEmail}</span>{" "}
              indicando tu nombre y el curso deseado.
            </p>
            <div>
              <p className="font-bold text-lg">
                💡 IMPORTANTE: Adjunta esta información:
              </p>
              <ul className="list-disc text-lg pl-6 mt-2">
                <li>📄 Comprobante de pago.</li>
                <li>📧 Email asociado a tu cuenta.</li>
                <li>📚 Nombre del curso deseado.</li>
              </ul>
              <p className="mt-4 text-lg">
                Habilitaremos tu curso en un plazo de{" "}
                <span className="font-bold">48 horas</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
