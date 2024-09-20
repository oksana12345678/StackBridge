import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlusCircle as Plus } from "react-icons/hi2";

import showToast from "../showToast.js";

import {
  selectLoading,
  selectError,
} from "../../redux/waterRequests/selectors.js";
import { addWaterModalOpen } from "../../redux/modalWindow/slice.js";
import css from "./WaterRatioPanel.module.css";
import { selectWatersToday } from "../../redux/waterRequests/selectors.js";
const WaterRatioPanel = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const water = useSelector(selectWatersToday);

  useEffect(() => {
    if (error) {
      showToast(
        "Error with loading percentage of your water consumption!",
        "error"
      );
    }
  }, [error]);

  const progressValue = water?.percentOfWaterRate || "0%";

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
          <div
            className={css.progressBarWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            <div className={css.progressTrack}>
              <div
                className={css.progressTrackValue}
                style={{
                  width: `${numberProgressValue}%`,
                }}
              ></div>
              <div
                className={css.progressSlider}
                style={{
                  left: `calc(${numberProgressValue}% - ${
                    (numberProgressValue * 14) / 100
                  }px)`,
                }}
              >
                {isHovered && (
                  <div className={css.currentValue}>{numberProgressValue}%</div>
                )}
              </div>
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
