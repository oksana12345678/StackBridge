import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

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
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token, isRefreshing } = useAuth();

  useEffect(() => {
    if (token && !isLoggedIn && !isRefreshing) {
      dispatch(refreshUser());
    }

    return;
  }, [dispatch, token, isLoggedIn, isRefreshing]);

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

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
