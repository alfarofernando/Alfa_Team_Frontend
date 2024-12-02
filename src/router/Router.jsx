import React from "react";
import { Routes, Route } from "react-router-dom";
import BlurSlideTransition from "../components/BlurSlideTransition.jsx";
import Home from "../pages/Home";
import Nosotros from "../pages/Nosotros";
import Cursos from "../pages/Cursos.jsx";
import AdminCourseList from "../pages/AdminCourseList";
import CourseDetail from "../pages/CourseDetail";
import AddCourse from "../pages/AddCourse";
import EditCourse from "../pages/EditCourse";
import Retos from "../pages/Retos.jsx";
import Contacto from "../pages/Contacto.jsx";
import { useAuth } from "../context/UserAuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import ManageCoursesAccess from "../pages/ManageCoursesAccess";
import Reports from "../pages/Reports.jsx";
import UserCourses from "../pages/UserCourses.jsx";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* RUTAS PÚBLICAS SIN LOGUEO */}
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
      <Route
        path="/curso/:courseId"
        element={
          <BlurSlideTransition>
            <CourseDetail />
          </BlurSlideTransition>
        }
      />
      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/login"
        element={
          <BlurSlideTransition>
            <Login />
          </BlurSlideTransition>
        }
      />
      <Route
        path="/registro"
        element={
          <BlurSlideTransition>
            <Registro />
          </BlurSlideTransition>
        }
      />
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
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/UserCourses"
          element={
            <BlurSlideTransition>
              <UserCourses />
            </BlurSlideTransition>
          }
        />
      </Route>
      <Route element={<ProtectedRoutes adminOnly />}>
        <Route
          path="/AdminDashboard"
          element={
            <BlurSlideTransition>
              <AdminDashboard />
            </BlurSlideTransition>
          }
        />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/course-list" element={<AdminCourseList />} />
        <Route path="/admin/edit-course/:courseId" element={<EditCourse />} />
        <Route
          path="/admin/manage-lesson-access"
          element={<ManageCoursesAccess />}
        />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
