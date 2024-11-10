import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const ManageLessonAccess = () => {
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [lessonId, setLessonId] = useState("");

  const handleGrantAccess = () => {
    // Lógica para otorgar acceso a la lección al usuario seleccionado
    console.log(
      `Otorgando acceso a la lección ${lessonId} para ${selectedUser.username}`
    );
    setLessonId(""); // Reiniciar el campo de ID de lección
  };

  const handleRevokeAccess = (lesson) => {
    // Lógica para revocar acceso a una lección específica
    console.log(
      `Revocando acceso a la lección ${lesson} para ${selectedUser.username}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-6">Administrar Acceso a Cursos</h1>

        <h2 className="text-xl font-semibold mb-4">Usuarios</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4">ID</th>
                <th className="border border-gray-300 p-4">Email</th>
                <th className="border border-gray-300 p-4">
                  Lecciones Asignadas
                </th>
                <th className="border border-gray-300 p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 p-4">{user.id}</td>
                  <td className="border border-gray-300 p-4">{user.email}</td>
                  <td className="border border-gray-300 p-4">
                    {user.permittedLessons && user.permittedLessons.length > 0
                      ? user.permittedLessons.join(", ")
                      : "Sin lecciones asignadas"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                    >
                      Gestionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Gestionar lecciones para {selectedUser.username}
            </h2>

            <div className="flex items-center mb-6">
              <input
                type="number"
                className="border rounded-lg p-2 mr-2"
                placeholder="ID de Lección"
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={handleGrantAccess}
              >
                Otorgar Acceso
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Lecciones Asignadas</h3>
            {selectedUser.permittedLessons &&
            selectedUser.permittedLessons.length > 0 ? (
              <ul>
                {selectedUser.permittedLessons.map((lesson) => (
                  <li
                    key={lesson}
                    className="flex items-center justify-between mb-2"
                  >
                    <span>Lección {lesson}</span>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRevokeAccess(lesson)}
                    >
                      Revocar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin lecciones asignadas</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessonAccess;
