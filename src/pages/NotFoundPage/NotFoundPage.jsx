import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (timer === 5) {
    return isLoggedIn ? (
      <Navigate to="/home" replace />
    ) : (
      <Navigate to="/welcome" replace />
    );
  }

  return (
    <>
      <Helmet>
        <title>Not found page</title>
      </Helmet>

      <div className={css.notFoundPage}>
        <p className={css.notFoundPageText}>
          Page you visited doesn&apos;t exist!
        </p>
        <p className={css.redirectText}>
          You will be redirected to {isLoggedIn ? "home" : "welcome"} page in{" "}
          {5 - timer} seconds!
        </p>
        <Link
          className={css.linkToHomeOrWelcomePage}
          to={isLoggedIn ? "/home" : "/welcome"}
        >
          Go to {isLoggedIn ? "home" : "welcome"} page
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
