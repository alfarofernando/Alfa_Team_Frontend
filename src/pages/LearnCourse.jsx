import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LearnCourseSidebar from "../components/LearnCourseSidebar.jsx";
import Footer from "../components/Footer.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
          setSelectedLesson(data.lessons?.[0] || null);
          console.log(data);
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

  const renderLessonContent = () => {
    if (!selectedLesson) {
      return (
        <p className="text-gray-500">
          Selecciona una lección para ver su contenido.
        </p>
      );
    }

    if (selectedLesson.type === "text") {
      return (
        <ReactQuill
          value={selectedLesson.content}
          readOnly={true}
          theme="bubble"
        />
      );
    }

    if (selectedLesson.type === "video") {
      return (
        <div className="video-container">
          <iframe
            width="100%"
            height="400px"
            src={selectedLesson.content + "?autoplay=1&rel=0&modestbranding=1"} // Acepta URLs como https://www.youtube.com/embed/U9cKsJ0F5N8?si=lduQcVdVhgnCiJ-g
            title={selectedLesson.title || "Video"}
            frameBorder=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerpolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      );
    }

    return <p className="text-gray-500">Tipo de lección no soportado.</p>;
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
      <div className="flex flex-col lg:flex-row-reverse relative h-screen">
        <div className="overflow-y-auto h-full bg-gray-100 p-4 border-l lg:border-r">
          <LearnCourseSidebar
            lessons={course.lessons || []}
            selectedLesson={selectedLesson}
            onLessonClick={handleLessonClick}
          />
        </div>

        <div className="flex-1 p-6 overflow-y-auto h-full">
          <h2 className="text-3xl text-center font-bold text-gray-800">
            {course.title}
          </h2>
          <div className="lesson-content text-center mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">
              {selectedLesson?.title}
            </h3>
            <div className="mt-4">{renderLessonContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LearnCourse;
