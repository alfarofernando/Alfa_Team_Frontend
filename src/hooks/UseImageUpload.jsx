import { useState } from "react";

const UseImageUpload = (endpoint) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file, courseId) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("course_id", courseId);

      const response = await fetch(endpoint, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image");
      }

      const data = await response.json();

      // En caso de que la respuesta contenga la ruta de la imagen, la retornamos
      if (data.imagePath) {
        return data.imagePath; // Ruta generada por el servidor
      } else {
        throw new Error("Image upload failed: No image path returned");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
};

export default UseImageUpload;
