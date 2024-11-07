import React, { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  const { courses, loading, error } = useCourses();
  if (loading) {
    return <p>CARGANDO CURSOS...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course) => (
        <CourseCard key={course.id} courses={courses} />
      ))}
    </div>
  );
};

export default CourseList;
