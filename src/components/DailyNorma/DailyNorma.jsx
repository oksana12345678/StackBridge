import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hourglass } from "react-loader-spinner";

import {
  selectError,
  selectLoading,
  selectWaterRate,
} from "../../redux/dailyNormalModal/selectors.js";
import { fetchUserData } from "../../redux/dailyNormalModal/operations.js";

import showToast from "../showToast.js";

import css from "./DailyNorma.module.css";

const DailyNorma = ({ handleOpenModal }) => {
  const dispatch = useDispatch();

  const waterRate = useSelector(selectWaterRate);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showToast("Error with loading your daily norma!", "error");
    }
  }, [error]);

  return (
    <div className={css.dailyNormaContainer}>
      <div className={css.title}>My daily norma</div>
      <div className={css.infoContainer}>
        {loading ? (
          <Hourglass
            visible={true}
            height="20"
            width="20"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        ) : error ? (
          <div>2 L</div>
        ) : (
          <div>{waterRate ? waterRate / 1000 : 2} L</div>
        )}
        <button className={css.editBtn} onClick={handleOpenModal}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default DailyNorma;
