import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { refreshUser } from "../../redux/auth/operations.js";

import SharedLayout from "../../components/SharedLayout/SharedLayout";
import RestrictedRoute from "../../components/Route/RegisteredRoute/RegisteredRoute.jsx";
import PrivateRoute from "../../components/Route/PrivateRout/PrivateRout.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useAuth } from "../../hooks/userAuth.js";
import { ToastContainer } from "react-toastify";

const WelcomePage = lazy(() =>
  import("../../pages/WelcomePage/WelcomePage.jsx")
);
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const ForgotPasswordPage = lazy(() =>
  import("../../pages/ForgotPasswordPage/ForgotPasswordPage.jsx")
);
const UpdatePasswordPage = lazy(() =>
  import("../../pages/UpdatePasswordPage/UpdatePasswordPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const dispatch = useDispatch();
  const { isRefreshing, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(refreshUser());

  //   return;
  // }, [dispatch]);

  useEffect(() => {
    // const savedToken = localStorage.getItem("token");

    dispatch(refreshUser());

    if (isLoggedIn) {
      navigate("/home");
    }
  }, [dispatch, isLoggedIn, token, navigate]);

  return isRefreshing ? (
    <b>
      <Loader />
    </b>
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SignupPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SigninPage />}
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/signin" component={<HomePage />} />
              }
            />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
