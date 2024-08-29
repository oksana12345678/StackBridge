import css from "./DailyNorma.module.css";

const DailyNorma = ({ dailyNorma = 2 }) => {
  return (
    <div className={css.dailyNormaContainer}>
      <div className={css.title}>My daily norma</div>
      <div className={css.infoContainer}>
        {dailyNorma} L <button className={css.editBtn}>Edit</button>
      </div>
    </div>
  );
};

export default DailyNorma;
