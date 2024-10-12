export const dummyUsers = [
  {
    id: 1,
    username: "1111",
    password: "1111", // Simple por motivos de prueba
    isAdmin: true,
  },
  {
    id: 2,
    username: "2222",
    password: "2222",
    isAdmin: false,
  },
  {
    id: 3,
    username: "regularUser2",
    password: "password456",
    isAdmin: false,
  },
  {
    id: 4,
    username: "adminTest",
    password: "testadmin789",
    isAdmin: false,
  },
];

// Función para verificar si un usuario existe con las credenciales correctas
export const verificarUsuario = (username, password) => {
  // Buscamos en el array un usuario que coincida con el username y la contraseña
  const usuario = dummyUsers.find(
    (user) => user.username === username && user.password === password
  );

  // Si encontramos el usuario, devolvemos un objeto con su username e isAdmin. Si no, devolvemos null.
  return usuario
    ? { username: usuario.username, isAdmin: usuario.isAdmin }
    : null;
};
