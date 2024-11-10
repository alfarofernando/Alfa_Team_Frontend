import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/UserAuthContext"; // Asegúrate de que el contexto esté correctamente importado

const UserCourses = () => {
  const { user } = useAuth(); // Obtener el usuario desde el contexto
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("No user is logged in.");
      setLoading(false);
      return;
    }

    const fetchUserCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://proyecto-alfa.local/getUserPermittedCourses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }), // Usar el user.id desde el contexto
          }
        );

        const textResponse = await response.text(); // Obtener la respuesta como texto
        console.log("Respuesta cruda:", textResponse); // Ver la respuesta completa

        // Verificar si la respuesta contiene múltiples bloques de JSON
        if (textResponse.includes("}{")) {
          console.error(
            "Respuesta no válida: contiene múltiples bloques JSON concatenados."
          );
        } else {
          const data = JSON.parse(textResponse); // Analizar JSON si es válido
          if (data.permittedCourses) {
            setCourses(data.permittedCourses);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [user]); // Dependencia para ejecutar cuando el usuario cambie

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Cursos</h1>
      {loading ? (
        <p className="text-gray-600">Cargando cursos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 duration-300"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-gray-500 mb-2">
                  <strong>Categoría:</strong> {course.category}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Nivel:</strong> {course.level}
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No tienes cursos habilitados.</p>
      )}
    </div>
  );
};

export default UserCourses;
