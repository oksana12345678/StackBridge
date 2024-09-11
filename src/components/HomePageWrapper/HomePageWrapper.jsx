import css from "./HomePageWrapper.module.css";

const HomePageWrapper = ({ children }) => {
  return (
    <section className={css.section}>
      <div className={css.bubbles}></div>
      <div className={css.shadow}></div>
      <div className={css.splash1}></div>
      <div className={css.splash2}></div>
      <div className={css.bottleOfWater}></div>
      {children}
    </section>
  );
};

export default HomePageWrapper;
