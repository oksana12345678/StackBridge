import clsx from "clsx";
import css from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({
  index,
  date = "Date not specified",
  dailyNorma = 0,
  percentageOfFulfillment = 0,
  servingsAmount = 0,
}) => {
  return (
    <div
      className={clsx(css.statsContainer, {
        [css.statsModalFirstColumn]: [0, 5, 10, 15, 20, 25, 30].includes(index),
        [css.statsModalSecondColumn]: [1, 6, 11, 16, 21, 26].includes(index),
        [css.statsModalThirdColumn]: [2, 7, 12, 17, 22, 27].includes(index),
        [css.statsModalFourthColumn]: [3, 8, 13, 18, 23, 28].includes(index),
        [css.statsModalFifthColumn]: [4, 9, 14, 19, 24, 29].includes(index),
        [css.statsModalRight]: [
          0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23, 30,
        ].includes(index),
        [css.statsModalLeft]: ![
          0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23, 30,
        ].includes(index),
      })}
    >
      <div className={css.statsInfoDate}>{date}</div>
      <div className={css.statsInfo}>
        Daily norma: <span className={css.statsInfoValue}>{dailyNorma}</span>
      </div>
      <div className={css.statsInfo}>
        Fulfillment of the daily norm:{" "}
        <span className={css.statsInfoValue}>{percentageOfFulfillment}</span>
      </div>
      <div className={css.statsInfo}>
        How many servings of water:{" "}
        <span className={css.statsInfoValue}>{servingsAmount}</span>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
