import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../../redux/auth/selectors.js";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
};


export default PrivateRoute;
