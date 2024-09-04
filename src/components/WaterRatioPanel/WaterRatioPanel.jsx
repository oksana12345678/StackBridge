import { useSelector } from "react-redux";
import { HiOutlinePlusCircle as Plus } from "react-icons/hi2";

import { selectWatersToday } from "../../redux/waterConsumption/selectors.js";

import css from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
  const waterConsumption = useSelector(selectWatersToday);

  const progressValue = waterConsumption?.percentOfWaterRate || "0%";

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
            <div className={css.adjustmentWrapper}>
              <div
                className={css.progressSlider}
                style={{
                  left: `${progressValue}`,
                }}
              ></div>
            </div>
          </div>
          <div className={css.progressBarRangeScale}>
            <span
              className={`${css.scaleValue} ${
                progressValue <= 0 ? css.activeScaleValue : ""
              }`}
            >
              0%
            </span>
            <span
              className={`${css.scaleValue} ${
                progressValue === 50 ? css.activeScaleValue : ""
              }`}
            >
              50%
            </span>
            <span
              className={`${css.scaleValue} ${
                progressValue >= 100 ? css.activeScaleValue : ""
              }`}
            >
              100%
            </span>
          </div>
        </div>
      </div>
      <button type="button" className={css.addButton}>
        <Plus className={css.plusCircle} size={24} />
        <span className={css.addButtonText}>Add Water</span>
      </button>
    </div>
  );
};

export default WaterRatioPanel;
