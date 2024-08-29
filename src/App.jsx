import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
// import { useState, lazy, Suspense, useEffect } from "react";
// import RestrictedRoute from "./RestrictedRoute.jsx";
// const SignUpPage = lazy(() => import("./pages/SignupPage/SignupPage"));
import SignUpPage from './pages/SignupPage/SignupPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/welcome" />
        <Route path="/home" />
        <Route path="/signup" element={<SignUpPage />} />

        {/* <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/" />
          }
        /> */}
        <Route path="/signin" />
      </Route>
    </Routes>
  );
}

export default App;
