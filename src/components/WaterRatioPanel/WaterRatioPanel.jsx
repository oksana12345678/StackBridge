import { useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlusCircle as Plus } from "react-icons/hi2";

import showToast from "../showToast.js";

import {
  selectLoading,
  selectError,
} from "../../redux/waterRequests/selectors.js";
import { getWaterForToday } from "../../redux/waterRequests/operations.js";
import { addWaterModalOpen } from "../../redux/modalWindow/slice.js";

import css from "./WaterRatioPanel.module.css";
import { selectDaysStats } from "../../redux/monthStats/selects.js";

const WaterRatioPanel = () => {
  const dispatch = useDispatch();

  const daysStats = useSelector(selectDaysStats);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getWaterForToday());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showToast(
        "Error with loading percentage of your water consumption!",
        "error"
      );
    }
  }, [error]);

  const progressValue =
    daysStats[daysStats.length - 1]?.percentOfWaterRate || "0%";

  const numberProgressValue =
    parseFloat(progressValue) > 100 ? 100 : parseFloat(progressValue);

  return (
    <div className={css.waterRatioPanelWrapper}>
      <div className={css.progressWrapper}>
        <p className={css.progressTitle}>Today</p>
        {loading ? (
          <Hourglass
            visible={true}
            height="30"
            width="30"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass={css.loader}
            colors={["#306cce", "#72a1ed"]}
          />
        ) : (
          <div className={css.progressBarWrapper}>
            <div className={css.progressTrack}>
              <div
                className={css.progressTrackValue}
                style={{
                  width: `${progressValue}`,
                }}
              ></div>
              <div
                className={css.progressSlider}
                style={{
                  left: `calc(${progressValue} - ${
                    (numberProgressValue * 14) / 100
                  }px)`,
                }}
              ></div>
            </div>
            <div className={css.progressBarRangeScale}>
              <span
                className={`${css.scaleValue} ${
                  numberProgressValue <= 0 ? css.activeScaleValue : ""
                }`}
              >
                0%
              </span>
              <span
                className={`${css.scaleValue} ${
                  numberProgressValue === 50 ? css.activeScaleValue : ""
                }`}
              >
                50%
              </span>
              <span
                className={`${css.scaleValue} ${
                  numberProgressValue >= 100 ? css.activeScaleValue : ""
                }`}
              >
                100%
              </span>
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        className={css.addButton}
        onClick={() => dispatch(addWaterModalOpen())}
      >
        <Plus className={css.plusCircle} size={24} />
        <span className={css.addButtonText}>Add Water</span>
      </button>
    </div>
  );
};

export default WaterRatioPanel;
