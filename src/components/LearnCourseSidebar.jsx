import React, { useState } from "react";

function LearnCourseSidebar({ lessons, selectedLesson, onLessonClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Botón para abrir/cerrar el menú */}
      <button
        className="fixed top-1 right-1 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Cerrar" : "Lecciones"}
      </button>

      {/* Sidebar desplegable con scroll */}
      <div
        className={`fixed top-0 right-0 h-fit text-center  w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } z-10 shadow-xl`}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
            Lecciones
          </h3>
          <ul className="mt-4 space-y-2 overflow-y-auto max-h-screen">
            {lessons?.map((lesson) => (
              <li key={lesson.id}>
                <button
                  onClick={() => onLessonClick(lesson)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    lesson.id === selectedLesson?.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default LearnCourseSidebar;
