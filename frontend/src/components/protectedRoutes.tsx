import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    rol_id: number;
}



export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { rol_id } = props;
  const token = sessionStorage.getItem("token")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user.rol_id !== rol_id) {
        return <Navigate to="/" replace />;
    }
  return <Outlet />;
};