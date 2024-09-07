import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import TodayWaterItem from "./TodayWaterItem";
import css from "./TodayWaterList.module.css";
import { FaPlus as Plus } from "react-icons/fa6";
import { selectWatersToday } from "../../redux/waterRequests/selectors";
import { getWaterForToday } from "../../redux/waterRequests/operations";
import TodayListModal from "../TodayListModal/TodayListModal";
import { addWaterModalOpen } from "../../redux/modalWindow/slice";

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const TodayWaterList = () => {
  const dispatch = useDispatch();
  const waterToday = useSelector(selectWatersToday);

  useEffect(() => {
    dispatch(getWaterForToday());
  }, [dispatch]);

  const entries = useMemo(
    () => waterToday?.todayWaterNotesList || [],
    [waterToday]
  );

  return (
    <div className={css["entries-container"]}>
      <div className={css.entries}>
        <h2 className={css.title}>Today</h2>
        {entries.length === 0 ? (
          <p className={css.empty}>No notes yet</p>
        ) : (
          <ul className={css["list-entry"]}>
            {entries.map(({ _id, waterVolume, date }) => (
              <TodayWaterItem
                key={_id}
                id={_id}
                waterVolume={waterVolume}
                date={formatTime(date)}
              />
            ))}
          </ul>
        )}
      </div>
      <button
        className={css["btn-add"]}
        onClick={() => dispatch(addWaterModalOpen())}
      >
        <Plus className={css.plus} /> Add water
      </button>
      <TodayListModal />
    </div>
  );
};
