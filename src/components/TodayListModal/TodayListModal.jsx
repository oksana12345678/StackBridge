import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editWater } from "../../redux/waterRequests/operations";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./TodayListModal.module.css";

// import WaveEffectButton from "../WaveEffectButton/WaveEffectButton";

import { selectIsEditWaterModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { getWaterForMonth } from "../../redux/monthStats/operations.js";

import {
  selectCurrentMonth,
  selectCurrentYear,
} from "../../redux/monthStats/selects.js";

import drink from "../../Icons/drink.svg";
import minus from "../../Icons/minus.svg";
import plus from "../../Icons/plus.svg";

const WaterSchema = Yup.object().shape({
  date: Yup.string().required("Required field!"),
  waterVolume: Yup.number()
    .min(1, "Too little! Min 1 ml")
    .max(5000, "Too much! Max 5000 ml")
    .required("Required field!"),
});

export default function TodayListModal({ waterNote }) {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsEditWaterModalOpen); //для модалки
  const currentMonth = useSelector(selectCurrentMonth); //TODO
  const currentYear = useSelector(selectCurrentYear); //TODO

  const fieldId = useId();

  // Лічильник
  const [amountOfWater, setAmountOfWater] = useState(waterNote.waterVolume);

  const incrementOfCounter = 50;

  const addAmount = () => {
    setAmountOfWater(amountOfWater + incrementOfCounter);
  };

  const withdrawAmount = () => {
    if (amountOfWater >= incrementOfCounter) {
      setAmountOfWater(amountOfWater - incrementOfCounter);
    }
  };

  // Генерування списку з часом
  const timeNow = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const generateListOfTime = () => {
    const options = [];
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour += 1) {
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
    const formattedDate = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return new Date(`${formattedDate} ${time}`).toISOString();
  }
  console.log(waterNote);
  // Функція відправки даних на бекенд
  const handleEditWater = (values, actions) => {
    const date = formatDateTime(values.date);
    const waterVolume = values.waterVolume;
    dispatch(editWater({ _id: waterNote.id, updates: { waterVolume, date } }))
      .unwrap()
      .then(() => {
        showToast("Water edit successful!", "success");
        actions.resetForm();
        dispatch(closeModal());
        // TODO Обновляем данные за текущий месяц в компоненте MonthStatsTable
        dispatch(
          getWaterForMonth({ year: currentYear, month: currentMonth + 1 })
        );
        setAmountOfWater(waterVolume);
      })
      .catch(() => {
        showToast("Water edit failed!", "error");
      });
  };

  return (
    <ModalWrapper
      modalIsOpen={modalIsOpen}
      closeModal={() => dispatch(closeModal())}
      customStyles={{
        content: {
          padding: "0",
        },
      }}
    >
      <Formik
        initialValues={{
          date: timeNow,
          waterVolume: waterNote.waterVolume,
        }}
        onSubmit={handleEditWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            <h2 className={css.title}>Edit the entered amount of water</h2>
            <div>
              <div className={css.prevRecordContainer}>
                <img src={drink} alt="Glass of water" />
                <div className={css.prevInfoContainer}>
                  <div className={css.prevAmountWater}>
                    {waterNote.waterVolume} ml
                  </div>
                  <div className={css.prevTime}>{waterNote.date}</div>
                </div>
              </div>
            </div>
            <p className={css.text}>Correct entered data:</p>
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
                <img src={minus} alt="Minus" />
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
                <img src={plus} alt="Plus" />
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
                <option value={waterNote.date}>{waterNote.date}</option>
                {listOfTime.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
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
                onChange={e => {
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
