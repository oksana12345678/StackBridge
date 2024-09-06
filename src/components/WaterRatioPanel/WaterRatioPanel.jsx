import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlusCircle as Plus } from "react-icons/hi2";

import { selectWatersToday } from "../../redux/waterRequests/selectors.js";
import { addWaterModalOpen } from "../../redux/modalWindow/slice.js";

import css from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
  const dispatch = useDispatch();

  const waterConsumption = useSelector(selectWatersToday);

  const progressValue = waterConsumption?.percentOfWaterRate || "0%";

  const numberProgressValue = parseFloat(progressValue);

  return (
    <div className={css.waterRatioPanelWrapper}>
      <div className={css.progressWrapper}>
        <p className={css.progressTitle}>Today</p>
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
