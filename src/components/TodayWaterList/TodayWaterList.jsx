import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import TodayWaterItem from "./TodayWaterItem";
import css from "./TodayWaterList.module.css";
// import { selectWatersToday } from "../../redux/waterConsumption/selectors";
// import { getWaterForTodayThunk } from "../../redux/waterConsumption/operations";
// import TodayListModal from "../../components/TodayListModal/TodayListModal";

export const TodayWaterList = () => {
  const dispatch = useDispatch();
  //   const waterToday = useSelector(selectWatersToday);
  const [isOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     dispatch(getWaterForTodayThunk());
  //   }, [dispatch]);

  const waterToday = {
    dailyEntries: [
      { _id: "1", waterVolume: 250, time: "08:00 AM" },
      { _id: "2", waterVolume: 300, time: "11:00 AM" },
      { _id: "3", waterVolume: 150, time: "01:00 PM" },
      { _id: "4", waterVolume: 200, time: "04:00 PM" },
    ],
  };

  const toggleModal = () => setIsOpen((prevState) => !prevState);

  const entries = useMemo(() => waterToday?.dailyEntries || [], [waterToday]);

  return (
    <div className={css["entries-container"]}>
      <div className={css.entries}>
        <h2 className={css.title}>Today</h2>
        {entries.length === 0 ? (
          <p className={css.empty}>No records</p>
        ) : (
          <ul className={css["list-entry"]}>
            {entries.map(({ _id, waterVolume, time }) => (
              <TodayWaterItem
                key={_id}
                id={_id}
                c
                amount={waterVolume}
                time={time}
              />
            ))}
          </ul>
        )}
      </div>
      <button className={css["btn-add"]} onClick={toggleModal}>
        <span className={css.plus}>+</span> Add water
      </button>
      {/* {isOpen && <TodayListModal />} */}
    </div>
  );
};
