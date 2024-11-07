// ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

export default function ProtectedRoutes({ adminOnly = false }) {
  const { user } = useAuth();

  // Si el usuario no está definido, carga desde localStorage como respaldo
  const savedUser = localStorage.getItem("user");
  const currentUser = user || (savedUser && JSON.parse(savedUser));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/UserDashboard" />;
  }

  return <Outlet />;
}
