import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
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
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/welcome" />
          <Route path="/home" />
          <Route path="/signup" />
          <Route path="/signin" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
