import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectWatersToday } from "../../redux/waterRequests/selectors.js";

import css from "./HomePageWrapper.module.css";

const HomePageWrapper = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const water = useSelector(selectWatersToday);

  useEffect(() => {
    setIsAnimating(true);
  }, [water]);

  return (
    <section className={css.section}>
      <div className={css.bubbles}></div>
      <div className={css.shadow}></div>
      <div className={css.splash1}></div>
      <div className={css.splash2}></div>
      <div
        className={`${css.bottleOfWater} ${
          isAnimating ? css.animateBottle : ""
        }`}
        onAnimationEnd={handleAnimationEnd}
      ></div>
      {children}
    </section>
  );
};

export default HomePageWrapper;
