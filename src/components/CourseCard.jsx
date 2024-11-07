// src/components/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();
  function handleClick() {
    return navigate("/CourseDetail/:id");
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <button onClick={handleClick}>
        <img
          className="w-full h-48 object-cover"
          src={courses.image}
          alt={courses.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{courses.title}</div>
          <p className="text-gray-700 text-base">{courses.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2">
            {courses.category}
          </span>
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
            ${courses.price}
          </span>
        </div>
      </button>
    </div>
  );
};

export default CourseCard;
