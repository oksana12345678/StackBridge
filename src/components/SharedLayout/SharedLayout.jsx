import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import css from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
