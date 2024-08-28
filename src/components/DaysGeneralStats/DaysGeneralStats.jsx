import css from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({
  date = "Date not specified",
  dailyNorma = 0,
  percentageOfFulfillment = 0,
  servingsAmount = 0,
}) => {
  return (
    <div className={css.statsContainer}>
      <div className={css.statsInfoDate}>{date}</div>
      <div className={css.statsInfo}>
        Daily norma: <span className={css.statsInfoValue}>{dailyNorma} L</span>
      </div>
      <div className={css.statsInfo}>
        Fulfillment of the daily norm:{" "}
        <span className={css.statsInfoValue}>{percentageOfFulfillment}%</span>
      </div>
      <div className={css.statsInfo}>
        How many servings of water:{" "}
        <span className={css.statsInfoValue}>{servingsAmount}</span>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
