import css from "./MainAuth.module.css";

const MainAuth = ({ children }) => {
  return (
    <main>
      <section>
        <div className={css.bottle}></div>
        <div className={css.bubbles}></div>
        <div className={css.container}>{children}</div>
      </section>
    </main>
  );
};

export default MainAuth;
