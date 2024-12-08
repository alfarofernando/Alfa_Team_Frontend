// components/EditCourse.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import useCourseLogic from "../hooks/useCourseLogic"; // Importamos el custom hook
import "react-quill/dist/quill.snow.css";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    category,
    setCategory,
    /* image,
    setImage, */
    level,
    setLevel,
    is_enabled,
    setIsEnabled,
    lessons,
    setLessons,
    newLesson,
    setNewLesson,
    showModal,
    setShowModal,
    handleSubmit,
    /* handleImageChange, */
    handleAddLesson,
    handleDeleteLesson,
    handleLessonChange,
    toggleLessonEnabled,
    handleDeleteCourse,
    handleOrderChange,
  } = useCourseLogic(courseId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="relative w-full max-w-3xl p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <button
          onClick={() => navigate("/admin/course-list")}
          className="absolute top-6 right-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md"
        >
          Volver
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Editar Curso
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Título del curso */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="title"
            >
              Título
            </label>
            <input
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              id="title"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Precio */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="price"
            >
              Precio
            </label>
            <input
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="number"
              id="price"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Categoría */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="category"
            >
              Categoría
            </label>
            <input
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              id="category"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/*<div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-medium mb-2"
                htmlFor="image"
              >
                Imagen
              </label>

              {/* Si hay una imagen subida, mostrarla */}
          {/* {image && (
                <div className="mb-4">
                  <img
                    src={image}
                    alt="Imagen del curso"
                    className="w-full h-auto border-2 border-gray-300 rounded-lg"
                  />
                </div>
              )}

              {/* Campo de entrada para subir una nueva imagen */}
          {/* <input
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>  */}

          {/* Nivel */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="level"
            >
              Nivel
            </label>
            <select
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="level"
              value={level || ""}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="1">Principiante</option>
              <option value="2">Intermedio</option>
              <option value="3">Avanzado</option>
            </select>
          </div>

          {/* Lecciones */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Lecciones
            </h2>

            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`border p-6 rounded-lg mb-4 shadow-lg transition-all duration-300 ${
                  lesson.is_enabled ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-xl text-gray-800">
                    {lesson.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>

                {/* Mostrar número de orden */}
                <p className="text-sm text-gray-600 mb-4">
                  Número de orden: {lesson.order_number}
                </p>

                {/* Botones para mover la lección */}
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => handleOrderChange(lesson.id, "up")}
                    disabled={lesson.order_number === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Mover arriba
                  </button>
                  <button
                    onClick={() => handleOrderChange(lesson.id, "down")}
                    disabled={lesson.order_number === lessons.length}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Mover abajo
                  </button>
                </div>

                {/* Editar título */}
                <input
                  type="text"
                  value={lesson.title || ""}
                  onChange={(e) =>
                    handleLessonChange(lesson.id, "title", e.target.value)
                  }
                  className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                {/* Editar tipo */}
                <select
                  value={lesson.type || ""}
                  onChange={(e) =>
                    handleLessonChange(lesson.id, "type", e.target.value)
                  }
                  className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                  <option value="text">Texto</option>
                  <option value="video">Video</option>
                </select>

                {/* Contenido para lección de texto */}
                {lesson.type === "text" ? (
                  <ReactQuill
                    value={lesson.content || ""}
                    onChange={(value) =>
                      handleLessonChange(lesson.id, "content", value)
                    }
                    className="w-full mb-4"
                  />
                ) : (
                  // Entrada para URL cuando el tipo es 'video'
                  <input
                    type="url"
                    value={lesson.content || ""}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "content", e.target.value)
                    }
                    placeholder="URL del video"
                    className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                )}

                {/* Habilitar/Deshabilitar lección */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => toggleLessonEnabled(lesson.id)}
                    className={`${
                      lesson.is_enabled ? "bg-red-500" : "bg-green-500"
                    } text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {lesson.is_enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </div>
              </div>
            ))}

            {/* Añadir nueva lección */}
            <div className="mb-6">
              <input
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Título de la nueva lección"
                value={newLesson.title || ""}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, title: e.target.value })
                }
              />

              {/* <input
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Número de orden"
                value={newLesson.order_number || ""}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, order_number: e.target.value })
                }
              /> */}

              <select
                value={newLesson.type || ""}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, type: e.target.value })
                }
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="text">Texto</option>
                <option value="video">Video</option>
              </select>

              {/* Contenido de la nueva lección */}
              {newLesson.type === "text" ? (
                <ReactQuill
                  value={newLesson.content || ""}
                  onChange={(content) =>
                    setNewLesson({ ...newLesson, content })
                  }
                  placeholder="Contenido de la lección"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      ["link"],
                      ["image"],
                    ],
                  }}
                  className="mb-4"
                />
              ) : (
                <input
                  type="url"
                  value={newLesson.content || ""}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, content: e.target.value })
                  }
                  placeholder="URL del video"
                  className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
              )}

              <button
                onClick={handleAddLesson}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Añadir lección
              </button>
            </div>
          </div>

          {/* Botón para enviar formulario y actualizar el curso */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-4"
          >
            Actualizar Curso
          </button>
          {/* Botón para mostrar el modal de confirmación para eliminar el curso */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg mt-4 shadow-md"
          >
            Eliminar Curso
          </button>
        </form>

        {/* Modal de confirmación */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">
                ¿Estás seguro de que quieres eliminar este curso?
              </h2>
              <p className="mb-6 text-gray-700">
                Esta acción eliminará el curso y todas las lecciones asociadas.
                No podrás deshacer esta acción.
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleDeleteCourse}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md"
                >
                  Continuar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
