// src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummy_course_data from '../utils/dummy_course_data';

const EditCourse = ({ updateCourse }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = dummy_course_data.find((c) => c.id === parseInt(courseId));
  
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [level, setLevel] = useState(course?.level || '1');
  const [lessons, setLessons] = useState(course?.lessons || []);
  const [newLesson, setNewLesson] = useState({ title: '', type: 'text', content: '' });

  useEffect(() => {
    if (!course) {
      navigate('/admin'); // Redirigir si no hay curso
    }
  }, [course, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(courseId, { title, description, level, lessons });
    navigate('/admin'); // Redirigir al dashboard
  };

  const handleAddLesson = () => {
    setLessons([...lessons, { ...newLesson, id: Date.now() }]);
    setNewLesson({ title: '', type: 'text', content: '' });
  };

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleLessonChange = (id, field, value) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Editar Curso</h1>
        <form onSubmit={handleSubmit}>
          {/* Información del curso */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="title">Título</label>
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
            <label className="block text-gray-700 mb-1" htmlFor="description">Descripción</label>
            <textarea
              className="w-full border rounded-lg p-2"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="level">Nivel</label>
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

          {/* Gestión de lecciones */}
          <h2 className="text-2xl font-bold mt-6 mb-4">Lecciones</h2>
          {lessons.map((lesson) => (
            <div key={lesson.id} className="border p-4 mb-4 rounded-lg">
              <input
                className="w-full border mb-2 p-2"
                type="text"
                value={lesson.title}
                onChange={(e) =>
                  handleLessonChange(lesson.id, 'title', e.target.value)
                }
                placeholder="Título de la lección"
              />
              <select
                className="w-full border mb-2 p-2"
                value={lesson.type}
                onChange={(e) =>
                  handleLessonChange(lesson.id, 'type', e.target.value)
                }
              >
                <option value="text">Texto</option>
                <option value="video">Video</option>
              </select>
              <input
                className="w-full border p-2"
                type="text"
                value={lesson.content}
                onChange={(e) =>
                  handleLessonChange(lesson.id, 'content', e.target.value)
                }
                placeholder="Contenido o URL del video"
              />
              <button
                className="bg-red-500 text-white mt-2 px-4 py-1 rounded-lg"
                onClick={() => handleDeleteLesson(lesson.id)}
              >
                Eliminar Lección
              </button>
            </div>
          ))}

          {/* Añadir nueva lección */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Añadir Lección</h3>
            <input
              className="w-full border mb-2 p-2"
              type="text"
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
              placeholder="Título de la lección"
            />
            <select
              className="w-full border mb-2 p-2"
              value={newLesson.type}
              onChange={(e) =>
                setNewLesson({ ...newLesson, type: e.target.value })
              }
            >
              <option value="text">Texto</option>
              <option value="video">Video</option>
            </select>
            <input
              className="w-full border p-2"
              type="text"
              value={newLesson.content}
              onChange={(e) =>
                setNewLesson({ ...newLesson, content: e.target.value })
              }
              placeholder="Contenido o URL del video"
            />
            <button
              className="bg-green-500 text-white mt-2 px-4 py-1 rounded-lg"
              onClick={handleAddLesson}
            >
              Añadir Lección
            </button>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 mt-6 rounded-lg w-full"
            type="submit"
          >
            Actualizar Curso
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
