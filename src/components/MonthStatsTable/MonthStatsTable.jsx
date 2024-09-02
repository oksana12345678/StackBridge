import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import clsx from "clsx";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { getMonthWater } from "../../redux/monthStats/operations";
import {
  selectCurrentMonth,
  selectCurrentYear,
  selectDaysStats,
  // selectLoading,
  selectSelectedDay,
  selectIsOpen,
} from "../../redux/monthStats/selectors";
import { monthNames } from "../../data/monthNames";
import {
  prevMonth,
  nextMonth,
  toggleModal,
} from "../../redux/monthStats/slice";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import css from "./MonthStatsTable.module.css";

const MonthStatsTable = () => {
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const daysStats = useSelector(selectDaysStats);
  const isOpen = useSelector(selectIsOpen);
  const selectedDay = useSelector(selectSelectedDay);
  const dispatch = useDispatch();

  const yearString = String(currentYear);
  const monthString = String(currentMonth + 1).padStart(2, "0");

  useEffect(() => {
    dispatch(getMonthWater({ year: yearString, month: monthString }));
  }, [currentMonth, currentYear, dispatch]);

  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  const handleDayClick = dayStats => {
    dispatch(toggleModal(dayStats));
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const dateNow =
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear();

  return (
    <div className={css.monthStateWrapper}>
      <div className={css.monthStateDate}>
        <h2 className={css.title}>Month</h2>
        <div className={css.paginationWrap}>
          <button className={css.paginationBtn} onClick={handlePrevMonth}>
            <GoChevronLeft className={css.icon} />
          </button>
          <span
            className={css.date}
          >{`${monthNames[currentMonth]}, ${currentYear}`}</span>
          <button
            className={css.paginationBtn}
            onClick={handleNextMonth}
            disabled={dateNow}
          >
            <GoChevronRight className={clsx(css.icon)} />
          </button>
        </div>
      </div>

      <ul className={css.list}>
        {daysArray.map(day => {
          const dayString = day.toString();
          const dayStats = daysStats.find(stat => {
            const statDay = stat.date.split(",")[0].trim();
            return statDay === dayString;
          });
          const fulfilled = dayStats?.percentOfWaterRate || "0%";
          const belowNorma = fulfilled !== "100%";

          return (
            <li
              className={css.item}
              key={day}
              // onClick={() => handleDayClick(dayStats)}
              onClick={() => handleDayClick(dayStats)}
            >
              <span
                className={clsx(css.day, {
                  [css.belowNorma]: belowNorma,
                })}
              >
                {day}
              </span>
              <span className={css.dailyNorma}>{fulfilled}</span>
            </li>
          );
        })}
      </ul>
      {isOpen && selectedDay && (
        <DaysGeneralStats
          date={selectedDay?.date}
          dailyNorma={selectedDay?.waterRate}
          percentageOfFulfillment={selectedDay?.percentOfWaterRate}
          servingsAmount={selectedDay?.amountOfRecords}
        />
      )}
    </div>
  );
};

export default MonthStatsTable;
