import { useContext } from "react";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";

export default function Retos() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`relative overflow-hidden z-10 py-4 my-4 ${
          darkMode ? "bg-dark text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="flex justify-center">
          <img
            src="../../public/enConstruccion.avif"
            className="rounded-full"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
