import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { verificarUsuario } from "../utils/dummy_login_data";

export default function Login() {
  const { darkMode } = useContext(ThemeContext);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClasses =
    "w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors duration-300";

  const handleLogin = async () => {
    const user = await verificarUsuario(email, password);
    if (user) {
      login(user.username, user.isAdmin);
      navigate(user.isAdmin ? "/AdminDashboard" : "/UserDashboard");
    } else {
      alert("Credenciales Incorrectas");
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
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
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
