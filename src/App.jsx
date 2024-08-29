import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";

// import { useState, lazy, Suspense, useEffect } from "react";
// import RestrictedRoute from "./RestrictedRoute.jsx";
// const SignUpPage = lazy(() => import("./pages/SignupPage/SignupPage"));

// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getCurrentUserInfo } from "./redux/service/user/getCurrentInfo/fetchCurrentUserData";


function App() {

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/welcome" />
          <Route path="/home" />
          <Route path="/signup" />
          <Route
            path="/signin"
            element={
              <RestrictedRoute redirectTo="/home" component={<SigninPage/>} />
            }
          />
        </Route>
      </Routes>
    </>

  );
}

export default App;
