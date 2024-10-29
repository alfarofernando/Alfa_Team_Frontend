export default function LogoutButton({ logout }) {
  return (
    <button
      onClick={logout}
      className="items-center mx-2 text-white rounded-full hover:bg-red-200 transition ease-in-out  hover:scale-150"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="red" // Cambiar a rojo
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16l4-4m0 0l-4-4m4 4H7m4 4h4a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h4"
        />
      </svg>
    </button>
  );
}
