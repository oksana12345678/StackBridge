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

// import { useState, lazy, Suspense, useEffect } from "react";
// import RestrictedRoute from "./RestrictedRoute.jsx";
// const SignUpPage = lazy(() => import("./pages/SignupPage/SignupPage"));

// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getCurrentUserInfo } from "./redux/service/user/getCurrentInfo/fetchCurrentUserData";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const getUserInfo = await dispatch(getCurrentUserInfo()).unwrap();
  //       console.log(getUserInfo);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserInfo();
  // }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
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
