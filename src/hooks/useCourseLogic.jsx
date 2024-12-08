import { useState, useEffect } from "react";
import useFetchCourse from "./useFetchCourse";
import { useNavigate } from "react-router-dom";
/* import UseImageUpload from "./UseImageUpload"; */

const useCourseLogic = (courseId) => {
  const { course } = useFetchCourse(courseId);
  const navigate = useNavigate();
  /*  const { uploadImage } = UseImageUpload(
    "http://proyecto-alfa.local/uploadImage"
  ); */
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  /* const [image, setImage] = useState(""); */
  const [level, setLevel] = useState("1");
  const [is_enabled, setIsEnabled] = useState(1);
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: "text",
    content: "",
    is_enabled: 1,
    order_number: null,
  });

  useEffect(() => {
    if (course) {
      const {
        title,
        description,
        price,
        category,
        level,
        is_enabled,
        lessons,
      } = course;
      setTitle(title || "");
      setDescription(description || "");
      setPrice(price);
      setCategory(category || "");
      setLevel(level || "1");
      setIsEnabled(is_enabled);
      setLessons(lessons || []);
    }
  }, [course]);

  /*  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }; */

  const handleAddLesson = () => {
    console.log("Adding lesson:", newLesson);
    if (newLesson.title && newLesson.content) {
      setLessons([
        ...lessons,
        { ...newLesson, id: Date.now(), order_number: lessons.length + 1 },
      ]);
      setNewLesson({
        title: "",
        type: "text",
        content: "",
        is_enabled: 1,
        order_number: lessons.length + 2,
      });
    } else {
      alert("Por favor, completa todos los campos de la lección.");
    }
  };

  const handleDeleteLesson = (id) => {
    console.log("Deleting lesson with id:", id);
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleLessonChange = (id, field, value) => {
    console.log(`Changing lesson ${id}, field: ${field}, value: ${value}`);
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const toggleLessonEnabled = (id) => {
    console.log("Toggling enabled for lesson with id:", id);
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === id
          ? { ...lesson, is_enabled: !lesson.is_enabled }
          : lesson
      )
    );
  };

  const handleOrderChange = (id, direction) => {
    console.log(`Changing order for lesson ${id} in direction: ${direction}`);
    const index = lessons.findIndex((lesson) => lesson.id === id);
    if (index === -1) return;

    const newLessons = [...lessons];
    const currentLesson = newLessons[index];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex >= 0 && swapIndex < lessons.length) {
      const swapLesson = newLessons[swapIndex];
      newLessons[swapIndex] = currentLesson;
      newLessons[index] = swapLesson;

      currentLesson.order_number = swapIndex + 1;
      swapLesson.order_number = index + 1;

      setLessons(newLessons);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Submitting course:",
      title,
      description,
      price,
      category,
      level,
      lessons
    );
    const updatedCourse = {
      title,
      description,
      price: parseFloat(price),
      category,
      /* image: imagePath, // La ruta de la imagen será la respuesta del servidor */
      level: parseInt(level),
      is_enabled: is_enabled ? 1 : 0,
      lessons: lessons.map((lesson) => ({
        ...lesson,
        is_enabled: lesson.is_enabled ? 1 : 0,
        order_number: parseInt(lesson.order_number),
      })),
    };
    console.log("Updated course data:", updatedCourse);
    try {
      const response = await fetch(
        `http://proyecto-alfa.local/updateCourse/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error al actualizar el curso: ${errorData.message}`);
        return; // Para evitar continuar con el proceso
      } else {
        alert("Curso actualizado exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la solicitud.");
    }
  };

  const handleDeleteCourse = async () => {
    console.log("Deleting course with id:", courseId);
    try {
      const response = await fetch(
        `http://proyecto-alfa.local/deleteCourse/${courseId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Curso eliminado exitosamente");
        setShowModal(false);
        navigate("/admin/course-list");
      } else {
        alert("Error al eliminar el curso.");
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("Hubo un problema con la solicitud.");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    category,
    setCategory,
    /* image,
    setImage, */
    level,
    setLevel,
    is_enabled,
    setIsEnabled,
    lessons,
    setLessons,
    newLesson,
    showModal,
    setShowModal,
    setNewLesson,
    handleSubmit,
    /* handleImageChange, */
    handleAddLesson,
    handleDeleteLesson,
    handleLessonChange,
    toggleLessonEnabled,
    handleDeleteCourse,
    handleOrderChange,
  };
};

export default useCourseLogic;
