// src/components/CourseDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import dummy_course_data from '../utils/dummy_course_data';

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = dummy_course_data.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return <div>No hay información del curso disponible.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={course.image} alt={course.title} />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <p className="text-gray-800 font-semibold mt-2">Categoría: {course.category}</p>
        <p className="text-gray-800 font-semibold mt-2">Nivel: {course.level}</p>
        <p className="text-gray-800 font-semibold mt-2">Precio: ${course.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CourseDetail;
