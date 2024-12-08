import React, { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom";

export default function AdminCourseList() {
  const { courses, setCourses, loading, error, setError } = useCourses();
  const [processing, setProcessing] = useState(null); // Estado para manejar el curso en acción
  const navigate = useNavigate();

  const toggleCourseStatus = async (courseId, currentStatus) => {
    const action = currentStatus ? "deshabilitar" : "habilitar";
    const confirmAction = window.confirm(
      `¿Estás seguro de que deseas ${action} este curso?`
    );

    if (!confirmAction) return;

    setProcessing(courseId); // Marcar el curso en proceso

    try {
      const response = await fetch(
        `http://proyecto-alfa.local/disableCourse/${courseId}`,
        { method: "PUT" }
      );

      if (!response.ok) {
        throw new Error(`Error al ${action} el curso.`);
      }

      const updatedCourse = courses.find((course) => course.id === courseId);
      updatedCourse.is_enabled = !currentStatus;

      // Actualizar la lista de cursos
      setCourses([...courses]);
      alert(`Curso ${action}do con éxito.`);
    } catch (err) {
      setError(`No se pudo ${action} el curso.`);
      console.log("Error:", err.message);
    } finally {
      setProcessing(null); // Desmarcar el curso en proceso
    }
  };

  if (loading) {
    return <p className="text-center text-blue-500">Cargando cursos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mt-8">Cursos Disponibles</h2>
      <div className="flex gap-4 my-4">
        <button
          onClick={() => navigate("/admin/add-course")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Agregar Curso
        </button>
        <button
          onClick={() => navigate("/AdminDashboard")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded"
        >
          Volver al Panel de Administración
        </button>
      </div>
      <ul className="mt-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className={`flex justify-between items-center p-4 mb-2 rounded shadow ${
              course.is_enabled ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <span
                className={`text-sm ${
                  course.is_enabled ? "text-green-600" : "text-red-600"
                }`}
              >
                {course.is_enabled ? "Habilitado" : "Deshabilitado"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/edit-course/${course.id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={() => toggleCourseStatus(course.id, course.is_enabled)}
                disabled={processing === course.id}
                className={`py-1 px-2 rounded-lg ${
                  course.is_enabled
                    ? "bg-red-400 hover:bg-red-500"
                    : "bg-green-400 hover:bg-green-500"
                } text-white ${
                  processing === course.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {processing === course.id
                  ? "Procesando..."
                  : course.is_enabled
                  ? "Deshabilitar"
                  : "Habilitar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
