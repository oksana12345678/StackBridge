import css from "./WelcomePageWrapper.module.css";

const WelcomePageWrapper = ({ children }) => {
  return (
    <section className={css.wrapper}>
      <div className={css.background}></div>
      <div className={css.blueWave}></div>
      <div className={css.whiteWave}></div>
      <div className={css.bottle}></div>
      <div className={css.bubble1}></div>
      <div className={css.bubble2}></div>
      <div className={css.bubble3}></div>
      <div className={css.bubble4}></div>
      <div className={css.bubble5}></div>
      <div className={css.bubble6}></div>
      <div className={css.bubble7}></div>
      <div className={css.bubble8}></div>
      <div className={css.bubble9}></div>
      <div>{children}</div>
    </section>
  );
};

export default WelcomePageWrapper;
