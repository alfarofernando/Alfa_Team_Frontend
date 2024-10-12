import { useContext } from "react";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";

export default function Cursos() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`relative overflow-hidden z-10 py-4 my-4 ${
          darkMode ? "bg-dark text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-center">CURSOS</h1>
        <p className="my-4 py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
          tempora tempore harum modi voluptate ea soluta aspernatur fuga
          veritatis omnis vel dolores saepe nesciunt mollitia possimus facere,
          itaque laudantium cum.
        </p>
        <p className="my-4 py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
          tempora tempore harum modi voluptate ea soluta aspernatur fuga
          veritatis omnis vel dolores saepe nesciunt mollitia possimus facere,
          itaque laudantium cum.
        </p>
        <p className="my-4 py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
          tempora tempore harum modi voluptate ea soluta aspernatur fuga
          veritatis omnis vel dolores saepe nesciunt mollitia possimus facere,
          itaque laudantium cum.
        </p>
      </div>
      <Footer />
    </>
  );
}
