import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWater } from "../../redux/water/operations";
import showToast from "../showToast";
import css from "./AddWater.module.css";

import minus from "../../Icons/minus.svg";
import plus from "../../Icons/plus.svg";
import close from "../../Icons/close.svg";

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

export default function AddWater() {
  const dispatch = useDispatch();

  const [amountOfWater, setAmountOfWater] = useState(0);
  const [result, setResult] = useState(0);
  const fieldId = useId();
  const incrementOfCounter = 50;

  const addAmount = () => {
    setAmountOfWater(amountOfWater + incrementOfCounter);
  };

  const withdrawAmount = () => {
    if (amountOfWater >= incrementOfCounter) {
      setAmountOfWater(amountOfWater - incrementOfCounter);
    }
  };

  /////// About TIME
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

  /////// Форматування дати для відправки на бекенд
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

  /////// Функція відправки даних на бекенд
  const handleAddWater = (values, actions) => {
    const time = formatDateTime(values.time);
    const amount = values.amount;
    dispatch(addWater({ amount, time }))
      .unwrap()
      .then(() => {
        showToast("Water add successful!", "success");
        actions.resetForm();
      })
      .catch(() => {
        showToast("Water add failed!", "error");
      });
  };

  return (
    <Formik
      initialValues={{ time: timeNow, amount: 0 }}
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
            <ErrorMessage className={css.error} name="time" component="span" />
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
            <button className={css.saveBtn} type="submit">
              Save
            </button>
          </div>

          <button className={css.closeBtn} type="button">
            <img src={close} alt="Close cross" />
          </button>
        </Form>
      )}
    </Formik>
  );
}
