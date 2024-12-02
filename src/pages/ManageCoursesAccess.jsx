import React, { useState } from "react";
import Select from "react-select";
import { useUsers } from "../hooks/useUsers";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const ManageCoursesAccess = () => {
  const { users, setUsers, loading, error } = useUsers();
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // Cambiado a objeto de `react-select`
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleCourseAction = async (courseId, action) => {
    if (!selectedUser || !courseId) {
      setAlertMessage("Seleccione un usuario y un curso válido.");
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
            ? [
                ...selectedUser.courses,
                courses.find((c) => c.id === courseId).title,
              ]
            : selectedUser.courses.filter(
                (course) =>
                  course !== courses.find((c) => c.id === courseId).title
              );

        setSelectedUser({ ...selectedUser, courses: updatedCourses });

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === selectedUser.user_id
              ? { ...user, courses: updatedCourses }
              : user
          )
        );

        setAlertMessage(
          action === "assign"
            ? `Curso asignado con éxito.`
            : `Curso revocado con éxito.`
        );
      } else {
        setAlertMessage(data.error || "Error al realizar la acción.");
      }
    } catch (error) {
      setAlertMessage(error.message || "Error de conexión.");
    }
  };

  // Filtrar usuarios por el término de búsqueda
  const filteredUsers = users.filter((user) =>
    user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Verificar si se ha realizado una búsqueda antes de mostrar usuarios */}
            {searchTerm === "" ? (
              <p>
                Por favor, realice una búsqueda utilizando la barra de búsqueda.
              </p>
            ) : (
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
                    {filteredUsers.map((user) => (
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
              </>
            )}

            {selectedUser && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Gestionar cursos para {selectedUser.user_email}
                </h2>
                <div className="flex items-center mb-6 w-full">
                  <Select
                    value={selectedCourse}
                    onChange={(option) => setSelectedCourse(option)}
                    options={courses.map((course) => ({
                      value: course.id,
                      label: course.title,
                    }))}
                    placeholder="Seleccione un curso"
                    className="w-full" // Asegura que el Select ocupe todo el ancho
                  />
                  <button
                    onClick={() =>
                      handleCourseAction(selectedCourse?.value, "assign")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded ml-2"
                  >
                    Asignar Curso
                  </button>
                  <button
                    onClick={() =>
                      handleCourseAction(selectedCourse?.value, "revoke")
                    }
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

            {/* Botón para redirigir */}
            <button
              onClick={() => {
                console.log("redirigiendo al menu principal"),
                  navigate("/AdminDashboard");
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-6"
            >
              Volver al Panel de Administración
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCoursesAccess;
