import { useState, useContext } from "react";
import { useAuth } from "../context/UserAuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { verificarUsuario } from "../utils/dummy_login_data";

export default function Login() {
  const { darkMode } = useContext(ThemeContext);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClasses =
    "w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors duration-300";

  // Función que maneja el intento de inicio de sesión
  const handleLogin = async () => {
    const user = await verificarUsuario(email, password); // Intentamos verificar el usuario
    if (user) {
      login(user.username, user.isAdmin);
      if (user.isAdmin) {
        alert(`Bienvenido, administrador ${user.username}`);
        // Redirigir al dashboard de admin si es necesario
        // Ejemplo: window.location.href = "/admin-dashboard";
      } else {
        alert(`Bienvenido, ${user.username}`);
        // Redirigir a la página de usuario regular
        // Ejemplo: window.location.href = "/dashboard";
      }
    } else {
      alert("Credenciales Incorrectas");
    }
  };

  return (
    <>
      <div className="relative overflow-hidden z-10 py-8 my-8">
        <div className="flex items-center justify-center">
          <div
            className={`relative w-2/3 px-10 py-5 rounded-lg shadow-lg content-center ${
              darkMode
                ? "shadow-stone-700  hover:shadow-stone-50 opacity-85"
                : "shadow-stone-400  hover:shadow-stone-900 opacity-95"
            } transition-transform duration-300 ease-in-out overflow-hidden`}
          >
            <h2 className="text-center text-2xl font-bold text-stone-700 mb-6">
              Accede con tu cuenta
            </h2>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Email:
              </label>
              <input
                type="email"
                className={inputClasses}
                placeholder="Ingresa tu email"
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <button
              onClick={handleLogin}
              className="w-full 
              px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
