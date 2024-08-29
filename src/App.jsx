import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

import SharedLayout from "./components/SharedLayout/SharedLayout";
import RestrictedRoute from "./components/Route/RegisteredRoute/RegisteredRoute.jsx";
import PrivateRoute from "./components/Route/PrivateRout/PrivateRout.jsx";
import Loader from "./components/Loader/Loader.jsx";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute>
                  <SignupPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute>
                  <SigninPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
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
