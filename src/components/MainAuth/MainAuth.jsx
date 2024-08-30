import css from "./MainAuth.module.css";

const MainAuth = ({ children }) => {
  return (
    <main>
      <section className={css.sectionMain}>
        <div className={css.container}>{children}</div>
      </section>
    </main>
  );
};

export default MainAuth;