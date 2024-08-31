import { useState, useEffect, useMemo, useRef } from "react";
import css from "./WaterRatioPanel.module.css";
import { useSelector } from "react-redux";
import { selectWatersToday } from "../../redux/waterConsumption/selectors";
// import TodayListModal from "../../components/TodayListModal/TodayListModal";
import { HiOutlinePlusCircle as Plus } from "react-icons/hi2";

const mockWaterToday = { progress: "15" };

const WaterRatioPanel = () => {
  const waterToday = mockWaterToday; // useSelector(selectWatersToday)

  const [progressValue, setProgressValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(progressValue || 0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const value = Math.min(100, Number(parseInt(waterToday?.progress, 10)));
    setProgressValue(value);
  }, [waterToday]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderLines = useMemo(() => {
    return (
      <>
        <span className={css.line}></span>
        <span className={css.line}></span>
        <span className={css.line}></span>
      </>
    );
  }, [progressValue]);

  const renderPercentages = useMemo(() => {
    return (
      <>
        <span className={css.number1}>0%</span>
        <span className={css.number2}>50%</span>
        <span className={css.number3}>100%</span>
      </>
    );
  }, [progressValue]);

  return (
    <div>
      <h2 className={css.today}>Today</h2>
      <div className={css.mainContainer}>
        <div className={css.panel}>
          <div className={css.range}>
            <div className={css.rangeContent}>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                step="1"
                readOnly
              />
            </div>
          </div>

          <div className={css.decorativeLines}>{renderLines}</div>
          <div className={css.percentages}>{renderPercentages}</div>
        </div>

        <button type="button" className={css.addButton} onClick={openModal}>
          <Plus className={css.plusCircle} size={24} />
          <span className={css.addButtonText}>Add Water</span>
        </button>
      </div>

      {/* {isOpen && <TodayListModal />} */}
    </div>
  );
};

export default WaterRatioPanel;
