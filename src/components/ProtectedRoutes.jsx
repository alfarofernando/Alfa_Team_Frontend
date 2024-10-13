import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

const ProtectedRoutes = ({ adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirige al login si no hay un usuario autenticado.
    return <Navigate to="/Login" />;
  }

  if (adminOnly && !user.isAdmin) {
    // Si no es admin y la ruta es solo para admins, redirige al dashboard del usuario.
    return <Navigate to="/UserDashboard" />;
  }

  // Permite el acceso si todo está en orden.
  return <Outlet />;
};

export default ProtectedRoutes;