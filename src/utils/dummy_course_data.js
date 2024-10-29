const dummy_course_data = [
  {
    id: 1,
    title: 'Introducción a Python - Nivel 1',
    description: 'Un curso básico para comenzar a programar en Python.',
    image: 'https://example.com/python-course1.jpg',
    category: 'Python',
    price: 29.99,
    level: 1,
    lessons: [
      { id: 1, title: '¿Qué es Python?', type: 'text', content: 'Python es un lenguaje de programación de alto nivel...' },
      { id: 2, title: 'Instalación de Python', type: 'video', content: 'https://example.com/videos/install-python.mp4' },
    ],
  },
  {
    id: 2,
    title: 'Python Intermedio - Nivel 2',
    description: 'Amplía tus conocimientos de Python con este curso intermedio.',
    image: 'https://example.com/python-course2.jpg',
    category: 'Python',
    price: 39.99,
    level: 2,
    lessons: [
      { id: 1, title: 'Funciones en Python', type: 'text', content: 'Las funciones permiten reutilizar código...' },
      { id: 2, title: 'Manejo de errores', type: 'video', content: 'https://example.com/videos/python-errors.mp4' },
    ],
  },
  {
    id: 3,
    title: 'Python Avanzado - Nivel 3',
    description: 'Domina Python y sus aplicaciones avanzadas.',
    image: 'https://example.com/python-course3.jpg',
    category: 'Python',
    price: 49.99,
    level: 3,
    lessons: [
      { id: 1, title: 'Programación orientada a objetos', type: 'text', content: 'La POO es un paradigma de programación...' },
      { id: 2, title: 'Decoradores avanzados', type: 'video', content: 'https://example.com/videos/python-decorators.mp4' },
    ],
  },
  {
    id: 4,
    title: 'Introducción a JavaScript - Nivel 1',
    description: 'Aprende JavaScript desde cero y comienza a crear tus primeras aplicaciones web.',
    image: 'https://example.com/javascript-course1.jpg',
    category: 'JavaScript',
    price: 29.99,
    level: 1,
    lessons: [
      { id: 1, title: 'Sintaxis básica de JavaScript', type: 'text', content: 'JavaScript es un lenguaje dinámico...' },
      { id: 2, title: 'Manipulación del DOM', type: 'video', content: 'https://example.com/videos/dom-manipulation.mp4' },
    ],
  },
  {
    id: 5,
    title: 'JavaScript Intermedio - Nivel 2',
    description: 'Profundiza en JavaScript y sus funcionalidades intermedias.',
    image: 'https://example.com/javascript-course2.jpg',
    category: 'JavaScript',
    price: 39.99,
    level: 2,
    lessons: [
      { id: 1, title: 'Closures y scopes', type: 'text', content: 'Los closures permiten crear funciones con ámbito léxico...' },
      { id: 2, title: 'Promesas y Async/Await', type: 'video', content: 'https://example.com/videos/js-promises.mp4' },
    ],
  },
  // Añade más cursos con sus respectivas lecciones según el patrón anterior
];

export default dummy_course_data;
