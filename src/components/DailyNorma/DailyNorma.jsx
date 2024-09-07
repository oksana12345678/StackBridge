import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hourglass } from "react-loader-spinner";
import {
  selectErrorWaterRate,
  selectWaterRate,
} from "../../redux/waterRate/selectors.js";
import showToast from "../showToast.js";
import css from "./DailyNorma.module.css";
import {
  selectLoadingUserData,
  selectWaterRateUpdate,
} from "../../redux/user/selectors.js";
import { fetchUserData } from "../../redux/user/operations.js";

const DailyNorma = ({ handleOpenModal }) => {
  const dispatch = useDispatch();

  const waterRateUpdate = useSelector(selectWaterRateUpdate);

  const waterRate = useSelector(selectWaterRate);
  const loading = useSelector(selectLoadingUserData);
  const error = useSelector(selectErrorWaterRate);

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
          <div>
            {waterRate ? (
              waterRate / 1000
            ) : waterRateUpdate ? (
              waterRateUpdate / 1000
            ) : (
              <Hourglass
                visible={true}
                height="20"
                width="20"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#306cce", "#72a1ed"]}
              />
            )}
            L
          </div>
        )}

        <button className={css.editBtn} onClick={handleOpenModal}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default DailyNorma;
