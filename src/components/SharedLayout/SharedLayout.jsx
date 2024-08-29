import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      {/* <Header/> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
