// src/pages/ManageLessonAccess.jsx
import React, { useState } from "react";
import { dummyUsers, asignarPermisoLeccion, revocarPermisoLeccion } from "../utils/dummy_login_data";

const ManageLessonAccess = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [lessonId, setLessonId] = useState("");

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleGrantAccess = () => {
    if (selectedUser && lessonId) {
      asignarPermisoLeccion(selectedUser.id, parseInt(lessonId));
      alert(`Acceso a la lección ${lessonId} otorgado a ${selectedUser.username}`);
    }
  };

  const handleRevokeAccess = (lesson) => {
    revocarPermisoLeccion(selectedUser.id, lesson);
    alert(`Acceso a la lección ${lesson} revocado de ${selectedUser.username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold mb-6">Administrar Acceso a Lecciones</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
          {dummyUsers.map((user) => (
            <button
              key={user.id}
              className="w-full text-left py-2 px-4 border-b"
              onClick={() => handleSelectUser(user)}
            >
              {user.username} {user.isAdmin ? "(Admin)" : ""}
            </button>
          ))}
        </div>

        {selectedUser && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Gestionar lecciones para {selectedUser.username}
            </h2>

            <div className="mb-4">
              <label className="block mb-2">ID de Lección:</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={handleGrantAccess}
              >
                Otorgar Acceso
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Lecciones Asignadas</h3>
              {selectedUser.permittedLessons.length > 0 ? (
                selectedUser.permittedLessons.map((lesson) => (
                  <div key={lesson} className="flex items-center justify-between">
                    <span>Lección {lesson}</span>
                    <button
                      className="text-red-500"
                      onClick={() => handleRevokeAccess(lesson)}
                    >
                      Revocar
                    </button>
                  </div>
                ))
              ) : (
                <p>Sin lecciones asignadas</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessonAccess;
