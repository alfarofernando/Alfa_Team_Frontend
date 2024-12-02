import React from "react";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom";

export default function AdminCourseList() {
  const { courses, loading, error } = useCourses();
  const navigate = useNavigate();

  if (loading) {
    return <p>CARGANDO CURSOS...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">Cursos Disponibles</h2>
      <button
        onClick={() => navigate("/admin/add-course")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 mx-2 rounded"
      >
        Agregar Curso
      </button>
      <button
        onClick={() => navigate("/AdminDashboard")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 mx-2 rounded"
      >
        Volver al Panel de Administración
      </button>
      <ul className="mt-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
          >
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p>{course.description}</p>
            </div>
            <div>
              <button
                onClick={() => navigate(`/admin/edit-course/${course.id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    "¿Estás seguro de que deseas eliminar este curso?"
                  );
                  if (confirmDelete) {
                    try {
                      const response = await fetch(
                        `http://proyecto-alfa.local/deleteCourse/${course.id}`,
                        {
                          method: "DELETE",
                        }
                      );

                      if (!response.ok) {
                        throw new Error("Error al eliminar el curso");
                      }

                      const updatedCourses = courses.filter(
                        (course) => course.id !== course.id
                      );
                      setCourses(updatedCourses);
                      alert("Curso eliminado con éxito.");
                    } catch (err) {
                      setError("No se pudo eliminar el curso.");
                      console.log("Error:", err.message);
                    }
                  }
                }}
                className="ml-2 bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
