import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import {
  editWater,
  getWaterForToday,
} from "../../redux/waterRequests/operations";
import { getWaterForMonth } from "../../redux/monthStats/operations.js";
import {
  selectIdToEdit,
  selectIsEditWaterModalOpen,
} from "../../redux/modalWindow/selectors";
import {
  selectCurrentMonth,
  selectCurrentYear,
} from "../../redux/monthStats/selects.js";
import { closeModal } from "../../redux/modalWindow/slice";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./TodayListModal.module.css";

const WaterSchema = Yup.object().shape({
  date: Yup.string().required("Required field!"),
  waterVolume: Yup.number()
    .min(1, "Too little! Min 1 ml")
    .max(5000, "Too much! Max 5000 ml")
    .required("Required field!"),
});

export default function TodayListModal({ waterVolume, date }) {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsEditWaterModalOpen); //для модалки
  const idToEdit = useSelector(selectIdToEdit);
  const currentMonth = useSelector(selectCurrentMonth); //TODO
  const currentYear = useSelector(selectCurrentYear); //TODO

  const fieldId = useId();

  // Лічильник
  const [amountOfWater, setAmountOfWater] = useState(waterVolume);

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
  // const timeNow = new Date().toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });

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
  const handleEditWater = (values, actions) => {
    const date = formatDateTime(values.date);
    const waterVolume = values.waterVolume;
    dispatch(editWater({ _id: idToEdit, updates: { waterVolume, date } }))
      .unwrap()
      .then(() => {
        showToast("Water edit successful!", "success");
        actions.resetForm();
        dispatch(getWaterForToday());
        dispatch(closeModal());
        // TODO Обновляем данные за текущий месяц в компоненте MonthStatsTable
        dispatch(
          getWaterForMonth({ year: currentYear, month: currentMonth + 1 })
        );
      })
      .catch(() => {
        showToast("Water edit failed!", "error");
      });
  };

  useEffect(() => {
    setAmountOfWater(waterVolume);
  }, [waterVolume]);

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
          date: date,
          waterVolume: waterVolume,
        }}
        onSubmit={handleEditWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            <h2 className={css.title}>Edit the entered amount of water</h2>
            <div>
              <div className={css.prevRecordContainer}>
                <svg className={css.iconGlass} width={36} height={36}>
                  <use href="/spriteFull.svg#icon-glass"></use>
                </svg>
                <div className={css.prevInfoContainer}>
                  <div className={css.prevAmountWater}>{waterVolume} ml</div>
                  <div className={css.prevTime}>{date}</div>
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
                <option value={date}>{date}</option>
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
              <button
                className={css.saveBtn}
                type="submit"
                onTouchStart={handleEditWater}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
