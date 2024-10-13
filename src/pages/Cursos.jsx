// src/pages/Cursos.jsx

import React from 'react';
import dummy_course_data from '../utils/dummy_course_data';
import { useNavigate } from 'react-router-dom';

const Cursos = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/curso/${courseId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummy_course_data.map((course) => (
        <div key={course.id} className="p-4 border rounded shadow" onClick={() => handleCourseClick(course.id)}>
          <h3 className="font-bold">{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Cursos;
