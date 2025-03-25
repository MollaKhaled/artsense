import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner/>
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRoute;