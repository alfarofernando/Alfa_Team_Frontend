// Hook useUsers.js
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await fetch(
          "http://proyecto-alfa.local/getUsersWithCourses"
        );
        const data = await response.json();

        console.log("Raw data fetched:", data);

        if (response.ok) {
          const normalizedUsers = data.map((user) => {
            const coursesTitles = user.courses_titles
              ? user.courses_titles.split(",")
              : [];
            const courseIds = user.course_ids
              ? user.course_ids.split(",").map(Number)
              : [];

            if (coursesTitles.length !== courseIds.length) {
              console.error(
                "Mismatch between courses and IDs for user:",
                user.user_email
              );
            }

            return {
              ...user,
              courses: coursesTitles,
              courseIds,
            };
          });

          console.log("Normalized users:", normalizedUsers);
          setUsers(normalizedUsers);
        } else {
          throw new Error(data.error || "Failed to load users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers, loading, error }; // Ahora se incluye setUsers
};
