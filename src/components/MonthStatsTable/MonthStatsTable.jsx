import { useSelector, useDispatch } from 'react-redux';
// import clsx from 'clsx';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import {
  selectCurrentMonth,
  selectCurrentYear,
} from '../../redux/monthStats/selectors';
import { monthNames } from '../../data/monthNames';
import { prevMonth, nextMonth } from '../../redux/monthStats/slice';
import css from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const dispatch = useDispatch();

  // Функция для перехода на предыдущий месяц
  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  // Функция для перехода на следующий месяц
  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  // Генерация дней месяца
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  console.log(daysInMonth);
  // Создание массива
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  console.log(daysArray);

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
            <GoChevronRight className={css.icon} />
          </button>
        </div>
      </div>

      <ul className={css.list}>
        {daysArray.map(day => (
          <li className={css.item} key={day}>
            <span className={css.day}>{day}</span>
            <span className={css.dailyNorma}>0%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
