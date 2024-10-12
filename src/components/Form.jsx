export default function Form() {
  return (
    <form className="space-y-4 justify-center">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Apellido</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-white"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded text-white"
        />
      </div>
      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-white"
        />
      </div>
      <div>
        <label className="block mb-1">Mensaje</label>
        <textarea
          rows="4"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className=" w-1/3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
