import listaMensajes from "../utils/mensajes.js";

export default function Separador() {
  const indiceRandom = Math.floor(Math.random() * listaMensajes.length);
  const mensajeRandom = listaMensajes[indiceRandom];

  return (
    <div className="my-4 container w-5/6 mx-auto border-y-4 rounded-full justify shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 border-stone-400 hover:border-stone-500 hover:bg-stone-300">
      <p className="my-4 text-center text-2xl font-semibold transition-colors duration-300 ease-in-out text-gray-800 hover:text-gray-600">
        {mensajeRandom}
      </p>
    </div>
  );
}
