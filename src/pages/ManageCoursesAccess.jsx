import React, { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { useCourses } from "../hooks/useCourses";

const ManageCoursesAccess = () => {
  const { users, setUsers, loading, error } = useUsers(); // Usamos setUsers para actualizar el estado
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const getCourseIdByTitle = (courseTitle) => {
    if (!courses || !courseTitle) {
      console.error("No se encontraron cursos o el título es inválido.");
      return null;
    }
    const course = courses.find((course) => course.title === courseTitle);
    return course ? course.id : null;
  };

  const handleCourseAction = async (courseTitle, action) => {
    if (!selectedUser || !courseTitle) {
      setAlertMessage("Seleccione un usuario y un curso válido.");
      return;
    }

    const courseId = getCourseIdByTitle(courseTitle);

    if (!courseId) {
      setAlertMessage("Curso no encontrado.");
      return;
    }

    const endpoint =
      action === "assign"
        ? "http://proyecto-alfa.local/assignCourse"
        : "http://proyecto-alfa.local/revokeCourse";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedUser.user_id,
          course_id: courseId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCourses =
          action === "assign"
            ? [...selectedUser.courses, courseTitle]
            : selectedUser.courses.filter((course) => course !== courseTitle);

        setSelectedUser({ ...selectedUser, courses: updatedCourses });

        // Actualizamos el estado global de los usuarios para reflejar el cambio
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === selectedUser.user_id
              ? { ...user, courses: updatedCourses }
              : user
          )
        );

        setAlertMessage(
          action === "assign"
            ? `Curso "${courseTitle}" asignado con éxito.`
            : `Curso "${courseTitle}" revocado con éxito.`
        );
      } else {
        setAlertMessage(data.error || "Error al realizar la acción.");
      }
    } catch (error) {
      setAlertMessage(error.message || "Error de conexión.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-6">Administrar Acceso a Cursos</h1>

        {loading && <p>Cargando usuarios...</p>}
        {error && <p>Error al cargar usuarios: {error}</p>}

        {coursesLoading && <p>Cargando cursos...</p>}
        {coursesError && <p>Error al cargar cursos: {coursesError}</p>}

        {!loading && !coursesLoading && !error && !coursesError && (
          <>
            <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4">Email</th>
                  <th className="border p-4">Cursos Asignados</th>
                  <th className="border p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="text-center">
                    <td className="border p-4">{user.user_email}</td>
                    <td className="border p-4">
                      {user.courses.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {user.courses.map((course, index) => (
                            <li key={index}>{course}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Sin cursos asignados</p>
                      )}
                    </td>
                    <td className="border p-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedUser && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Gestionar cursos para {selectedUser.user_email}
                </h2>
                <div className="flex items-center mb-6">
                  <input
                    type="text"
                    className="border rounded-lg p-2 mr-2"
                    placeholder="Título del curso"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                  />
                  <button
                    onClick={() => handleCourseAction(newCourseTitle, "assign")}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  >
                    Asignar Curso
                  </button>
                  <button
                    onClick={() => handleCourseAction(newCourseTitle, "revoke")}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded ml-2"
                  >
                    Revocar Curso
                  </button>
                </div>

                {alertMessage && (
                  <div className="alert alert-info">{alertMessage}</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCoursesAccess;
