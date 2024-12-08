import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        console.log("NO USER IS LOGGED IN");
        return;
      }

      const userId = user.id;

      try {
        const response = await fetch(`http://proyecto-alfa.local/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Error fetching data user");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigateToCourses = () => {
    navigate("/UserCourses"); // Navega a la vista de cursos habilitados
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        "http://proyecto-alfa.local/updateUserData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            userData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user data");
      }

      alert("Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 text-black p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-8">Menú</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={handleNavigateToCourses} // Manejar navegación a Mis Cursos
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 px-4 rounded"
              >
                Mis Cursos
              </button>
            </li>
            <li>
              <button className="bg-blue-500 hover:bg-blue-600 w-full py-2 px-4 rounded">
                Retos Completados
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded mt-6"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>

        {/* Contenido Principal */}
        <div className="flex-grow p-8">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              Editar Perfil
            </h1>

            {userData ? (
              <form className="space-y-4">
                {Object.entries(userData).map(([key, value]) => {
                  if (
                    [
                      "id",
                      "isAdmin",
                      "permittedCourses",
                      "created_at",
                      "image",
                    ].includes(key)
                  ) {
                    return null; // Omitimos estos campos
                  }

                  return (
                    <div key={key} className="flex flex-col">
                      <label className="font-semibold capitalize text-gray-900">
                        {key.replace(/_/g, " ")}
                      </label>
                      <input
                        type={key === "password" ? "password" : "text"}
                        name={key}
                        value={value || ""}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 font-semibold"
                >
                  Actualizar Información
                </button>
              </form>
            ) : (
              <p className="text-gray-900 text-center">Cargando datos...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
