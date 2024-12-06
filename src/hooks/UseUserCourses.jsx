// src/hooks/useUserCourses.js
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserAuthContext";

export const useUserCourses = () => {
  const { user } = useAuth(); // Asegúrate de que el contexto proporciona el correo electrónico del usuario
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!user || !user.id) {
        setError("No se ha iniciado sesión correctamente.");
        setLoading(false);
        return;
      }
      console.log("user from useAuth:", user);
      setLoading(true);
      try {
        console.log("Fetching courses for user:", user.id);

        const response = await fetch(
          `http://proyecto-alfa.local/getCoursesByUserId/${user.id}`
        );

        console.log("API response status:", response.status);
        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }

        const data = await response.json();
        console.log("API response data:", data);

        // Actualización lógica
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
          setError(null); // No hay error
        } else {
          setCourses([]);
          setError("No se encontraron cursos.");
        }
      } catch (err) {
        setError("No se pudo cargar la información de los cursos.");
        console.error("Error al obtener cursos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [user]);

  return { courses, loading, error };
};
