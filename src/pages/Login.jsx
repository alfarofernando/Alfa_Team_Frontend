import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext"; // Importa el contexto
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function Login() {
  const { darkMode } = useContext(ThemeContext);
  const { setUser } = useAuth(); // Accede a setUser desde el contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const inputClasses =
    "w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors duration-300";

  const handleLogin = async () => {
    console.log("Iniciando proceso de login...");
    console.log("Correo:", email, "Contraseña:", password);

    try {
      const response = await fetch("http://proyecto-alfa.local/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta del servidor recibida:", response);

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      console.log("Datos recibidos:", data);

      // Verifica si la respuesta contiene un ID (lo cual indica que el login fue exitoso)
      if (data.id) {
        setUser(data); // Almacena el usuario en el contexto global
        console.log("Login exitoso, redirigiendo...");

        // Verifica si es un administrador
        if (data.isAdmin) {
          console.log(
            "Usuario es administrador, redirigiendo a AdminDashboard..."
          );
          navigate("/AdminDashboard"); // Redirige al dashboard del administrador
        } else {
          console.log("Usuario regular, redirigiendo a UserDashboard...");
          navigate("/UserDashboard"); // Redirige al dashboard del usuario
        }
      } else {
        console.log(
          "Error de autenticación: respuesta del servidor no exitosa."
        );
        throw new Error("Error de autenticación");
      }
    } catch (error) {
      setError(error.message);
      console.log("Error durante el proceso de login:", error);
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
                Correo electrónico:
              </label>
              <input
                type="email"
                className={inputClasses}
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
