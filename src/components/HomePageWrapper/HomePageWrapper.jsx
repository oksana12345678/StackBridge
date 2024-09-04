import css from "./HomePageWrapper.module.css";

const HomePageWrapper = ({ children }) => {
  return (
    <section className={css.section}>
      <div className={css.bubbles}></div>
      <div className={css.bottle}></div>
      {children}
    </section>
  );
};

export default HomePageWrapper;
