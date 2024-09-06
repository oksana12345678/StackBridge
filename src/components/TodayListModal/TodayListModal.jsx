import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWater, editWater } from "../../redux/waterRequests/operations";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./TodayListModal.module.css";

// import WaveEffectButton from "../WaveEffectButton/WaveEffectButton";
// для модалки

import { selectIsAddWaterModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
// import { selectWatersToday } from "../../redux/waterRequests/selectors";
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
  const modalIsOpen = useSelector(selectIsAddWaterModalOpen); //для модалки

  const currentMonth = useSelector(selectCurrentMonth); //TODO
  const currentYear = useSelector(selectCurrentYear); //TODO

  const fieldId = useId();

  // const waterToday = useSelector(selectWatersToday);
  // console.log(waterToday);

  // const waterTodayList = useSelector(selectWatersToday); //масив записів про воду за сьогодні
  // const sortedWaterTodayList = waterTodayList.sort((a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);
  //   return dateA - dateB;
  // });

  // const lastWaterToday = sortedWaterTodayList[sortedWaterTodayList.length - 1];

  const lastWaterToday = null;

  // Лічильник
  const [amountOfWater, setAmountOfWater] = useState(() => {
    if (lastWaterToday) {
      return lastWaterToday.waterVolume;
    }
    return 0;
  });
  const [result, setResult] = useState(0);

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

  // Функція відправки даних на бекенд
  const handleAddWater = (values, actions) => {
    const date = formatDateTime(values.date);
    const waterVolume = values.waterVolume;
    dispatch(addWater({ waterVolume, date }))
      .unwrap()
      .then(() => {
        showToast("Water add successful!", "success");
        actions.resetForm();
        dispatch(closeModal());
        setAmountOfWater(0);
        //TODO Обновляем данные за текущий месяц в компоненте MonthStatsTable
        dispatch(
          getWaterForMonth({ year: currentYear, month: currentMonth + 1 })
        );
      })
      .catch(() => {
        showToast("Water add failed!", "error");
      });
  };

  const handleEditWater = (values, actions) => {
    const date = formatDateTime(values.time);
    const waterVolume = values.waterVolume;
    dispatch(editWater({ id: id, updates: { waterVolume, date } }))
      .unwrap()
      .then(() => {
        showToast("Water edit successful!", "success");
        actions.resetForm();
        dispatch(closeModal());
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
          waterVolume: lastWaterToday ? lastWaterToday.waterVolume : 0,
        }}
        onSubmit={handleAddWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            {/* <h2 className={css.title}>Edit the entered amount of water</h2> */}
            <h2 className={css.title}>Add water</h2>
            {/* {!lastWaterToday ? (
              <p className={css.textNoNotes}>No notes yet</p>
            ) : (
              <div>
                <div className={css.prevRecordContainer}>
                  <img src={drink} alt="Glass of water" />
                  <div className={css.prevInfoContainer}>
                    <div className={css.prevAmountWater}>
                      {lastWaterToday.waterVolume} ml
                    </div>
                    <div className={css.prevTime}>
                      {new Date(lastWaterToday.date).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            {/* <p className={css.text}>Correct entered data:</p> */}
            <p className={css.text}>Choose a value:</p>
            <p className={css.textCounter}>Amount of water:</p>
            <div className={css.counterContainer}>
              <button
                className={css.amountBtn}
                onClick={withdrawAmount}
                type="button"
                onBlur={() => {
                  setFieldValue("waterVolume", amountOfWater);
                  setResult(amountOfWater);
                }}
              >
                <img src={minus} alt="Minus" />
              </button>
              <div className={css.amountCounter}>{amountOfWater}ml</div>
              <button
                className={css.amountBtn}
                onClick={addAmount}
                type="button"
                onBlur={() => {
                  setFieldValue("waterVolume", amountOfWater);
                  setResult(amountOfWater);
                }}
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
                <option value={timeNow}>{timeNow}</option>
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
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    setFieldValue("waterVolume", "");
                  }
                }}
                onBlur={(e) => {
                  setAmountOfWater(Number(e.target.value));
                  setResult(Number(e.target.value));
                  if (e.target.value === "") {
                    setFieldValue("waterVolume", "0");
                  }
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <ErrorMessage
                className={css.error}
                name="waterVolume"
                component="span"
              />
            </div>
            <div className={css.resultContainer}>
              <p className={css.textResult}>{result}ml</p>
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
