import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const adminLoggedIn = localStorage.getItem("adminToken"); 
  if (!adminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};
