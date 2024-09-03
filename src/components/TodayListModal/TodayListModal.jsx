import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editWater } from "../../redux/water/operations";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./TodayListModal.module.css";
import { selectWaterToday } from "../../redux/water/selectors";
import WaveEffectButton from "../WaveEffectButton/WaveEffectButton";
// для модалки
import { selectIsEditWaterModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";

import drink from "../../Icons/drink.svg";
import minus from "../../Icons/minus.svg";
import plus from "../../Icons/plus.svg";

const WaterSchema = Yup.object().shape({
  time: Yup.string()
    .min(8, "Too Short! Min 8 symbols")
    .max(50, "Too Long! Max 50 symbols")
    .required("Required field!"),
  amount: Yup.number()
    .min(1, "Too little! Min 1 ml")
    .max(5000, "Too much! Max 5000 ml")
    .required("Required field!"),
});

export default function TodayListModal({ waterRecord: { id } }) {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsEditWaterModalOpen); //для модалки
  const fieldId = useId();

  const waterTodayList = [
    {
      amount: 50,
      time: "2024-09-02T22:24:00.000Z",
      userId: "66d077a4d82e176e87037322",
      _id: "66d63b1ee2bba0005c5aa5e4",
      createdAt: "2024-09-02T22:24:30.420Z",
      updatedAt: "2024-09-02T22:24:30.420Z",
    },
    {
      amount: 250,
      time: "2024-09-02T08:24:00.000Z",
      userId: "66d077a4d82e176e87037322",
      _id: "66d63b1ee2bba0005c5aa5e4",
      createdAt: "2024-09-02T22:24:30.420Z",
      updatedAt: "2024-09-02T22:24:30.420Z",
    },
    {
      amount: 500,
      time: "2024-09-02T12:24:00.000Z",
      userId: "66d077a4d82e176e87037322",
      _id: "66d63b1ee2bba0005c5aa5e4",
      createdAt: "2024-09-02T22:24:30.420Z",
      updatedAt: "2024-09-02T22:24:30.420Z",
    },
  ]; // для прикладу //
  // const waterTodayList = useSelector(selectWaterToday); //масив записів про воду за сьогодні
  const sortedWaterTodayList = waterTodayList.sort((a, b) => {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);
    return timeA - timeB;
  });
  const lastWaterToday = sortedWaterTodayList[sortedWaterTodayList.length - 1];

  // Лічильник
  const [amountOfWater, setAmountOfWater] = useState(lastWaterToday.amount);
  const [result, setResult] = useState(lastWaterToday.amount);

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
    const formattedDate = new Date()
      .toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    return `${formattedDate} ${time}`;
  }

  // Функція відправки даних на бекенд
  const handleEditWater = (values, actions) => {
    const time = formatDateTime(values.time);
    const amount = values.amount;
    dispatch(editWater({ id: id, updates: { amount, time } }))
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
        initialValues={{ time: timeNow, amount: lastWaterToday.amount }}
        onSubmit={handleEditWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            <h2 className={css.title}>Edit the entered amount of water</h2>
            {!lastWaterToday ? (
              <p className={css.textNoNotes}>No notes yet</p>
            ) : (
              <div>
                <div className={css.prevRecordContainer}>
                  <img src={drink} alt="Glass of water" />
                  <div className={css.prevInfoContainer}>
                    <div className={css.prevAmountWater}>
                      {lastWaterToday.amount} ml
                    </div>
                    <div className={css.prevTime}>
                      {new Date(lastWaterToday.time).toLocaleTimeString(
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
            )}
            <p className={css.text}>Correct entered data:</p>
            <p className={css.textCounter}>Amount of water:</p>
            <div className={css.counterContainer}>
              <button
                className={css.amountBtn}
                onClick={withdrawAmount}
                type="button"
                onBlur={() => {
                  setFieldValue("amount", amountOfWater);
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
                  setFieldValue("amount", amountOfWater);
                  setResult(amountOfWater);
                }}
              >
                <img src={plus} alt="Plus" />
              </button>
            </div>
            <div className={css.timeContainer}>
              <label className={css.labelTime} htmlFor={`${fieldId}-time`}>
                Recording time:
              </label>
              <Field
                as="select"
                name="time"
                className={css.input}
                id={`${fieldId}-time`}
              >
                <option value={timeNow}>{timeNow}</option>
                {listOfTime.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={css.error}
                name="time"
                component="span"
              />
            </div>
            <div className={css.enterValueContainer}>
              <label
                className={css.enterValueLabel}
                htmlFor={`${fieldId}-amount`}
              >
                Enter the value of the water used:
              </label>
              <Field
                className={css.input}
                name="amount"
                type="number"
                id={`${fieldId}-amount`}
                onBlur={(e) => {
                  setAmountOfWater(Number(e.target.value));
                  setResult(Number(e.target.value));
                }}
              />
              <ErrorMessage
                className={css.error}
                name="amount"
                component="span"
              />
            </div>
            <div className={css.resultContainer}>
              <p className={css.textResult}>{result}ml</p>
              {/* <WaveEffectButton> */}
              <button className={css.saveBtn} type="submit">
                Save
              </button>
              {/* </WaveEffectButton> */}
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
