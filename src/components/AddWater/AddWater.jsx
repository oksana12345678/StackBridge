import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWater,
  getWaterForToday,
} from "../../redux/waterRequests/operations";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./AddWater.module.css";

import { selectIsAddWaterModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { getWaterForMonth } from "../../redux/monthStats/operations.js";
import {
  selectCurrentMonth,
  selectCurrentYear,
} from "../../redux/monthStats/selects.js";
import moment from "moment";

const WaterSchema = Yup.object().shape({
  date: Yup.string().required("Required field!"),
  waterVolume: Yup.number()
    .min(1, "Too little! Min 1 ml")
    .max(5000, "Too much! Max 5000 ml")
    .required("Required field!"),
});

export default function AddWater() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsAddWaterModalOpen);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const fieldId = useId();

  const [amountOfWater, setAmountOfWater] = useState(50);

  const yearString = String(currentYear);
  const monthString = String(currentMonth + 1).padStart(2, "0");

  const incrementOfCounter = 50;

  const addAmount = () => setAmountOfWater(amountOfWater + incrementOfCounter);
  const withdrawAmount = () => {
    if (amountOfWater >= incrementOfCounter) {
      setAmountOfWater(amountOfWater - incrementOfCounter);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = Math.floor(now.getMinutes() / 5) * 5;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    return `${hours.toString().padStart(2, "0")}:${formattedMinutes} ${ampm}`;
  };

  const timeNow = getCurrentTime();

  const generateListOfTime = () => {
    const options = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        const time = `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${ampm}`;
        options.push(time);
      }
    }
    return options;
  };

  const listOfTime = generateListOfTime();

  // Форматування дати для відправки на бекенд
  function formatDateTime(time) {
    const formattedDate = moment().format("YYYY-MM-DD");
    const time24 = moment(time, "h:mm A").format("HH:mm");

    return moment(`${formattedDate} ${time24}`).toISOString();
  }

  const initialTime = listOfTime.includes(timeNow) ? timeNow : listOfTime[0];

  const handleAddWater = (values, actions) => {
    const date = formatDateTime(values.date);
    const waterVolume = values.waterVolume;
    dispatch(addWater({ waterVolume, date }))
      .unwrap()
      .then(() => {
        showToast("Water add successful!", "success");
        actions.resetForm();
        dispatch(getWaterForToday());
        dispatch(closeModal());
        setAmountOfWater(50);

        //TODO Обновляем данные за текущий месяц в компоненте MonthStatsTable
        dispatch(getWaterForMonth({ year: yearString, month: monthString }));
      })
      .catch(() => {
        showToast("Water add failed!", "error");
      });
  };

  return (
    <ModalWrapper
      modalIsOpen={modalIsOpen}
      closeModal={() => {
        dispatch(closeModal());
        setAmountOfWater(50);
      }}
      customStyles={{
        content: {
          padding: "0",
        },
      }}
    >
      <Formik
        initialValues={{ date: initialTime, waterVolume: 50 }}
        onSubmit={handleAddWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            <h2 className={css.title}>Add water</h2>
            <p className={css.text}>Choose a value:</p>
            <p className={css.textCounter}>Amount of water:</p>
            <div className={css.counterContainer}>
              <button
                className={css.amountBtn}
                onClick={() => {
                  withdrawAmount();
                  if (amountOfWater > 0) {
                    setFieldValue(
                      "waterVolume",
                      amountOfWater - incrementOfCounter
                    );
                  }
                }}
                type="button"
              >
                <svg className={css.iconMinus} width={24} height={24}>
                  <use href="/spriteFull.svg#icon-minus"></use>
                </svg>
              </button>
              <div className={css.amountCounter}>{amountOfWater}ml</div>
              <button
                className={css.amountBtn}
                onClick={() => {
                  addAmount();
                  setFieldValue(
                    "waterVolume",
                    amountOfWater + incrementOfCounter
                  );
                }}
                type="button"
              >
                <svg className={css.iconPlus} width={24} height={24}>
                  <use href="/spriteFull.svg#icon-plus"></use>
                </svg>
              </button>
            </div>
            <div className={css.timeContainer}>
              <label className={css.labelTime} htmlFor={`${fieldId}-date`}>
                Recording time:
              </label>
              <Field
                as="select"
                name="date"
                className={css.input}
                id={`${fieldId}-date`}
              >
                {listOfTime.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={css.error}
                name="date"
                component="span"
              />
            </div>
            <div className={css.enterValueContainer}>
              <label
                className={css.enterValueLabel}
                htmlFor={`${fieldId}-waterVolume`}
              >
                Enter the value of the water used:
              </label>
              <Field
                className={css.input}
                name="waterVolume"
                type="number"
                min="0"
                id={`${fieldId}-waterVolume`}
                onChange={(e) => {
                  setFieldValue("waterVolume", Number(e.target.value));
                  setAmountOfWater(Number(e.target.value));
                }}
              />
              <ErrorMessage
                className={css.error}
                name="waterVolume"
                component="span"
              />
            </div>
            <div className={css.resultContainer}>
              <p className={css.textResult}>{amountOfWater}ml</p>
              <button className={css.saveBtn} type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
