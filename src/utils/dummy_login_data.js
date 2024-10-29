export const dummyUsers  = [
  {
    id: 1,
    username: "1111",
    password: "1111", // Simple por motivos de prueba
    isAdmin: true,
    permittedLessons: [], // Todos los permisos por ser admin
  },
  {
    id: 2,
    username: "2222",
    password: "2222",
    isAdmin: false,
    permittedLessons: [101], // Acceso a lección 101
  },
  {
    id: 3,
    username: "regularUser2",
    password: "password456",
    isAdmin: false,
    permittedLessons: [102, 103], // Acceso a lecciones 102 y 103
  },
  {
    id: 4,
    username: "adminTest",
    password: "testadmin789",
    isAdmin: false,
    permittedLessons: [], // Sin permisos aún
  },
];

export const asignarPermisoLeccion = (userId, lessonId) => {
  const user = dummyUsers.find((u) => u.id === userId);
  if (user && !user.permittedLessons.includes(lessonId)) {
    user.permittedLessons.push(lessonId);
  }
};

export const revocarPermisoLeccion = (userId, lessonId) => {
  const user = dummyUsers.find((u) => u.id === userId);
  if (user) {
    user.permittedLessons = user.permittedLessons.filter((id) => id !== lessonId);
  }
};

export const tieneAccesoALeccion = (userId, lessonId) => {
  const user = dummyUsers.find((u) => u.id === userId);
  return user?.isAdmin || user?.permittedLessons.includes(lessonId);
};

// Función para verificar si un usuario existe con las credenciales correctas
export const verificarUsuario = (username, password) => {
  const usuario = dummyUsers.find(
    (user) => user.username === username && user.password === password
  );

  return usuario ? { username: usuario.username, isAdmin: usuario.isAdmin } : null;
};

