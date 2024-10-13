import React from "react";
import { Routes, Route } from "react-router-dom";
import BlurSlideTransition from "../components/BlurSlideTransition.jsx";
import Home from "../pages/Home";
import Nosotros from "../pages/Nosotros";
import Cursos from "../pages/Cursos.jsx";
import AdminCourseList from "../pages/AdminCourseList";
import CourseDetail from "../pages/CourseDetail";
import AddCourse from '../pages/AddCourse';
import EditCourse from '../pages/EditCourse';
import Retos from "../pages/Retos.jsx";
import Contacto from "../pages/Contacto.jsx";
import {useAuth} from "../context/UserAuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes.jsx";
import Login from "../pages/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";

export default function AppRouter() {
const {user} = useAuth();
const addCourse = (course) => {
  // Lógica para añadir curso
};
const updateCourse= (courses) => {
   // Lógica para modificar curso
}

  return (
    <Routes>
      {/* RUTAS PRUBLICAS SIN LOGUEO */}
      <Route
        path="/"
        element={
          <BlurSlideTransition>
            <Home />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Nosotros"
        element={
          <BlurSlideTransition>
            <Nosotros />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Cursos"
        element={
          <BlurSlideTransition>
            <Cursos />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Retos"
        element={
          <BlurSlideTransition>
            <Retos />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/Contacto"
        element={
          <BlurSlideTransition>
            <Contacto />
          </BlurSlideTransition>
        }
      />
       <Route path="/curso/:courseId" element={<BlurSlideTransition><CourseDetail /></BlurSlideTransition>} />
      {/* RUTAS PROTEGIDAS */}
      {/* ruta habilitada solo si no hay un usuario logeado */}
      <Route
  path="/Login"
  element={
    <BlurSlideTransition>
      <Login />
    </BlurSlideTransition>
  }
/>
       {/* ruta hablitada solo para usuarios !admin */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/UserDashboard"
          element={
            <BlurSlideTransition>
              <UserDashboard />
            </BlurSlideTransition>
          }
        />
      </Route>
{/* Ruta habilitada solo para usuarios admin */}
      <Route element={<ProtectedRoutes adminOnly />}>
        <Route
          path="/AdminDashboard"
          element={
            <BlurSlideTransition>
              <AdminDashboard />
            </BlurSlideTransition>
          }
        />
        
      <Route path="/admin/add-course" element={<AddCourse addCourse={addCourse} />} />
      <Route path="/admin/course-list" element={<AdminCourseList />} /> {/* Ruta para ver cursos */}
      <Route path="/admin/edit-course/:courseId" element={<EditCourse updateCourse={updateCourse} />} />
      
      </Route>
      
      
    </Routes>
  );
}