import { useSelector } from "react-redux";

import css from "./DailyNorma.module.css";

const DailyNorma = ({ handleOpenModal }) => {
  const dailyNorma = 2;
  // const dailyNorma = useSelector((state) => state.dailyNormalModal.waterRate);

  return (
    <div className={css.dailyNormaContainer}>
      <div className={css.title}>My daily norma</div>
      <div className={css.infoContainer}>
        {dailyNorma ? dailyNorma / 1000 : 2} L{" "}
        <button className={css.editBtn} onClick={handleOpenModal}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default DailyNorma;
