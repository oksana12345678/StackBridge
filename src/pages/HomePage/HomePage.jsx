import { Helmet } from "react-helmet-async";

import HomePageWrapper from "../../components/HomePageWrapper/HomePageWrapper.jsx";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>

      <HomePageWrapper />
    </>
  );
};

export default HomePage;
