import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCourse = ({ addCourse }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("1");
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: "text",
    content: "",
    order_number: 1,
    is_enabled: true, // Nuevo campo
  });
  const [isEnabled, setIsEnabled] = useState(true); // Estado para habilitar/deshabilitar el curso

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto con los datos que se van a enviar
    const courseData = {
      title,
      description,
      price,
      category,
      level,
      lessons,
      is_enabled: isEnabled, // Pasar estado de habilitación del curso
    };

    try {
      const response = await fetch("http://proyecto-alfa.local/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Curso agregado exitosamente:", data);
        navigate("/admin/course-list");
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el curso:", errorData);
        alert("Hubo un error al agregar el curso. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la solicitud. Intenta de nuevo.");
    }
  };

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.content) {
      setLessons([...lessons, { ...newLesson }]); // El ID se asignará en el backend
      setNewLesson({
        title: "",
        type: "text",
        content: "",
        order_number: lessons.length + 1,
        is_enabled: true,
      });
    } else {
      alert("Por favor, complete todos los campos de la lección.");
    }
  };

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.order_number !== id));
  };

  const handleLessonChange = (order_number, field, value) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.order_number === order_number
          ? { ...lesson, [field]: value }
          : lesson
      )
    );
  };

  const toggleCourseEnabled = () => {
    setIsEnabled((prevState) => !prevState);
  };

  const toggleLessonEnabled = (order_number) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.order_number === order_number
          ? { ...lesson, is_enabled: !lesson.is_enabled }
          : lesson
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="relative w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <button
          onClick={() => navigate("/admin/course-list")}
          className="absolute top-4 right-4 bg-gray-600 text-white py-2 px-4 rounded-full"
        >
          Volver
        </button>

        <h1 className="text-3xl font-bold mb-6">Agregar Curso</h1>
        <form onSubmit={handleSubmit}>
          {/* Campos del curso */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="title">
              Título
            </label>
            <input
              className="w-full border rounded-lg p-2"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="price">
              Precio
            </label>
            <input
              className="w-full border rounded-lg p-2"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="category">
              Categoría
            </label>
            <input
              className="w-full border rounded-lg p-2"
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="level">
              Nivel
            </label>
            <select
              className="w-full border rounded-lg p-2"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
          </div>

          {/* Habilitar/Deshabilitar curso */}
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleCourseEnabled}
              className={`${
                isEnabled ? "bg-green-500" : "bg-red-500"
              } text-white py-2 px-4 rounded-lg`}
            >
              {isEnabled ? "Deshabilitar Curso" : "Habilitar Curso"}
            </button>
          </div>

          {/* Lecciones */}
          <h2 className="text-2xl font-bold mt-6 mb-4">Lecciones</h2>
          {lessons.map((lesson) => {
            return (
              <div key={lesson.id} className="border p-4 mb-4 rounded-lg">
                <input
                  className="w-full border mb-2 p-2"
                  type="text"
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(lesson.id, "title", e.target.value)
                  }
                  placeholder="Título de la lección"
                />
                <select
                  className="w-full border mb-2 p-2"
                  value={lesson.type}
                  onChange={(e) =>
                    handleLessonChange(lesson.id, "type", e.target.value)
                  }
                >
                  <option value="text">Texto</option>
                  <option value="video">Video</option>
                </select>

                {lesson.type === "text" ? (
                  <ReactQuill
                    value={lesson.content}
                    onChange={(value) =>
                      handleLessonChange(lesson.id, "content", value)
                    }
                    placeholder="Escribe el contenido de la lección"
                  />
                ) : (
                  <input
                    className="w-full border p-2"
                    type="text"
                    value={lesson.content}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "content", e.target.value)
                    }
                    placeholder="Contenido o URL del video"
                  />
                )}

                {/* Botón para habilitar/deshabilitar lección */}
                <button
                  type="button"
                  onClick={() => toggleLessonEnabled(lesson.id)}
                  className={`${
                    lesson.is_enabled ? "bg-green-500" : "bg-red-500"
                  } text-white mt-2 px-4 py-1 rounded-lg`}
                >
                  {lesson.is_enabled
                    ? "Deshabilitar Lección"
                    : "Habilitar Lección"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="bg-red-600 text-white mt-2 px-4 py-1 rounded-lg"
                >
                  Eliminar Lección
                </button>
              </div>
            );
          })}

          {/* Formulario de nueva lección */}
          <div className="mb-4">
            <input
              className="w-full border p-2 mb-2"
              type="text"
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
              placeholder="Título de la lección"
            />
            <select
              className="w-full border p-2 mb-2"
              value={newLesson.type}
              onChange={(e) =>
                setNewLesson({ ...newLesson, type: e.target.value })
              }
            >
              <option value="text">Texto</option>
              <option value="video">Video</option>
            </select>

            {newLesson.type === "text" ? (
              <ReactQuill
                value={newLesson.content}
                onChange={(value) =>
                  setNewLesson({ ...newLesson, content: value })
                }
                placeholder="Escribe el contenido de la lección"
              />
            ) : (
              <input
                className="w-full border p-2 mb-2"
                type="text"
                value={newLesson.content}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, content: e.target.value })
                }
                placeholder="Contenido o URL del video"
              />
            )}
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleAddLesson}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Agregar Lección
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Agregar Curso
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
