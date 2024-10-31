import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function Login() {
  const { darkMode } = useContext(ThemeContext);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Usar username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para manejar errores

  const inputClasses =
    "w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors duration-300";

  const handleLogin = async () => {
    try {
      const response = await fetch("http://proyecto-alfa.local/login", {
        // Cambiar la ruta aquí
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales Incorrectas");
      }

      const data = await response.json();
      // Supongamos que la respuesta contiene el usuario y isAdmin
      login(data.username, data.isAdmin); // Usa el nombre de usuario y el rol
      navigate(data.isAdmin ? "/AdminDashboard" : "/UserDashboard");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden z-10 py-8 my-8">
        <div className="flex items-center justify-center">
          <div
            className={`relative w-2/3 px-10 py-5 rounded-lg shadow-lg ${
              darkMode
                ? "shadow-stone-700 hover:shadow-stone-50 opacity-85"
                : "shadow-stone-400 hover:shadow-stone-900 opacity-95"
            } transition-transform duration-300 ease-in-out`}
          >
            <h2 className="text-center text-2xl font-bold text-stone-700 mb-6">
              Accede con tu cuenta
            </h2>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Usuario:
              </label>
              <input
                type="text"
                className={inputClasses}
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Contraseña:
              </label>
              <input
                type="password"
                className={inputClasses}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            <p className="text-center text-sm mt-4 text-stone-500">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-blue-600 hover:underline">
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
