import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import {  useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/userAuth.js";
import { refreshUser } from "./redux/auth/operations.js";
import RestrictedRoute from "./components/Route/RegisteredRoute/RegisteredRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";
import SigninPage from "./pages/SignInPage/SignInPage.jsx";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/welcome" />
          <Route path="/home" />
          <Route path="/signup" />
          <Route
            path="/signin"
            element={
              <RestrictedRoute redirectTo="/home" component={<SigninPage />} />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
