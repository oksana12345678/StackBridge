import DailyNorma from "../DailyNorma/DailyNorma.jsx";

import css from "./HomePageWrapper.module.css";

const HomePageWrapper = () => {
  return (
    <section className={css.homePageWrapper}>
      <div className={css.bottle}></div>
      <div className={css.bubbles}></div>
      <DailyNorma />
    </section>
  );
};

export default HomePageWrapper;
