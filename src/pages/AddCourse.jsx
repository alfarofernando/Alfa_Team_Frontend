// src/pages/AddCourse.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = ({ addCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('1'); // Default level
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ title, description, level }); // Agregar curso
    navigate('/admin/course-list'); // Redirigir al dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6">Agregar Curso</h1>
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
            Agregar Curso
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
