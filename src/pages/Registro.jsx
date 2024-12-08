import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function Register() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputClasses =
    "w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors duration-300";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { email, username, password, confirmPassword } = formData; // Desestructuramos formData

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    } else if (!email || !username || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Preparamos los datos como un objeto JSON
    const dataToSend = {
      email,
      password,
      username,
    };

    try {
      const response = await fetch("http://proyecto-alfa.local/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Cuenta creada con éxito.");
        console.log(dataToSend);
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Error al crear la cuenta. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      alert("Error en la solicitud. Inténtalo de nuevo.");
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
              Crear una nueva cuenta
            </h2>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                className={inputClasses}
                placeholder="Ingresa tu correo electrónico"
                onChange={handleChange}
              />
            </p>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Nombre Usuario:
              </label>
              <input
                type="text"
                name="username"
                className={inputClasses}
                placeholder="Ingresa tu nombre de usuario"
                onChange={handleChange}
              />
            </p>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                className={inputClasses}
                placeholder="Ingresa una contraseña"
                onChange={handleChange}
              />
            </p>
            <p className="my-4">
              <label className="text-sm font-bold uppercase text-stone-500">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={inputClasses}
                placeholder="Confirma tu contraseña"
                onChange={handleChange}
              />
            </p>
            <button
              onClick={handleRegister}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
