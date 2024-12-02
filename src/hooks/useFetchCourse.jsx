import { useState, useEffect } from "react";

const useFetchCourse = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://proyecto-alfa.local/course/${courseId}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          throw new Error("Curso no encontrado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  return { course, loading, error };
};

export default useFetchCourse;
