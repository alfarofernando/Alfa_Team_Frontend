import { useState, useEffect } from "react";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://proyecto-alfa.local/getAllCourses"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(courses);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error, setError, setCourses };
};
