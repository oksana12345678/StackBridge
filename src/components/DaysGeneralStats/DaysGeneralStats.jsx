import clsx from "clsx";
import {
  fifthColumn,
  firstColumn,
  fourthColumn,
  modalLeft,
  modalRight,
  secondColumn,
  thirdColumn,
} from "../../data/daysForStyles";
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
        [css.statsModalFirstColumn]: firstColumn.includes(index),
        [css.statsModalSecondColumn]: secondColumn.includes(index),
        [css.statsModalThirdColumn]: thirdColumn.includes(index),
        [css.statsModalFourthColumn]: fourthColumn.includes(index),
        [css.statsModalFifthColumn]: fifthColumn.includes(index),
        [css.statsModalRight]: modalRight.includes(index),
        [css.statsModalLeft]: !modalLeft.includes(index),
      })}
    >
      <div className={css.statsInfoDate}>{date}</div>
      <div className={css.statsInfo}>
        Daily norma: <span className={css.statsInfoValue}>{dailyNorma}</span>
      </div>
      <div className={css.statsInfo}>
        Fulfillment of the daily norm:
        <span className={css.statsInfoValue}>{percentageOfFulfillment}</span>
      </div>
      <div className={css.statsInfo}>
        How many servings of water:
        <span className={css.statsInfoValue}>{servingsAmount}</span>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
