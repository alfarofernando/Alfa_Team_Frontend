import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LearnCourseSidebar from "../components/LearnCourseSidebar.jsx";
import Footer from "../components/Footer.jsx";

function LearnCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      console.error("No se recibió un courseId válido.");
      setError("ID de curso inválido.");
      setLoading(false);
      return;
    }

    console.log(`Fetching course and lessons for courseId: ${courseId}`);

    fetch(`http://proyecto-alfa.local/course/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener el curso: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.id) {
          setCourse(data);
          setSelectedLesson(data.lessons?.[0] || null); // Selecciona la primera lección si está disponible
        } else {
          throw new Error("Datos del curso no válidos.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  if (loading) {
    return <p className="loading">Cargando curso...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!course) {
    return <p className="not-found">No se encontró el curso.</p>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse relative h-screen ">
        {/* Sidebar con scroll a la derecha */}
        <div className="overflow-y-auto h-full  bg-gray-100 p-4 border-l lg:border-r">
          <LearnCourseSidebar
            lessons={course.lessons || []}
            selectedLesson={selectedLesson}
            onLessonClick={handleLessonClick}
          />
        </div>

        {/* Contenido principal con scroll a la izquierda */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          <h2 className="text-3xl text-center font-bold text-gray-800">
            {course.title}
          </h2>
          <div className="lesson-content text-center mt-6">
            {selectedLesson ? (
              <>
                <h3 className="text-2xl font-semibold text-gray-700">
                  {selectedLesson.title}
                </h3>
                <p className="mt-4 text-gray-600">{selectedLesson.content}</p>
              </>
            ) : (
              <p className="text-gray-500">
                Selecciona una lección para ver su contenido.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LearnCourse;
