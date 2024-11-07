import React, { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
/* import { useNavigate } from "react-router-dom"; */

function Cursos() {
  const { courses, loading, error } = useCourses();
  if (loading) {
    console.log("cargando cursos");
    return <p>CARGANDO CURSOS</p>;
  }
  if (error) {
    console.log("error al cargar cursos");
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="p-4 border rounded shadow"
          onClick={() => handleCourseClick(course.id)}
        >
          <h3 className="font-bold">{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

/* const Cursos = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/curso/${courseId}`);
  };
 */

export default Cursos;
