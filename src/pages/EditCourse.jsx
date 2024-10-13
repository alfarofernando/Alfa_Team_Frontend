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

  useEffect(() => {
    if (!course) {
      // Si no hay curso, redirigir o mostrar error
      navigate('/admin'); // Redirigir al dashboard
    }
  }, [course, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(courseId, { title, description, level });
    navigate('/admin'); // Redirigir al dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6">Editar Curso</h1>
        <form onSubmit={handleSubmit}>
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" type="submit">
            Actualizar Curso
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
