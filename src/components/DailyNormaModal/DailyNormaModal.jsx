import { Formik, Form, Field } from "formik";
import css from "./DailyNormaModal.module.css";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectIsModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";

const handleSubmit = (values, action) => {
  console.log(values.plannedWaterIntake * 1000);
  action.resetForm();
};

const calculateWater = (gender, weight, activeTime) => {
  if (weight === 0 || weight === 0) return "2.0";
  if (gender === "man") {
    return (weight * 0.04 + activeTime * 0.6).toFixed(1);
  } else {
    return (weight * 0.03 + activeTime * 0.4).toFixed(1);
  }
};

const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalWrapper
      modalIsOpen={isModalOpen}
      closeModal={handleCloseModal}
    >
      <div className={css.container}>
        <div>
          <h2 className={css.title}>My daily norma</h2>
          <div className={css.formulasContainer}>
            <p className={css.formulas}>
              For woman:{" "}
              <span className={css.formulasSpan}>
                V=(M*0,03) + (T*0,4)
              </span>
            </p>
            <p className={css.formulas}>
              For man:{" "}
              <span className={css.formulasSpan}>
                V=(M*0,04) + (T*0,6)
              </span>
            </p>
          </div>
          <p className={css.formulaDescription}>
            <span className={css.span}>*</span> V is the
            volume of the water norm in liters per day, M is
            your body weight, T is the time of active
            sports, or another type of activity commensurate
            in terms of loads (in the absence of these, you
            must set 0)
          </p>
        </div>

        <Formik
          initialValues={{
            gender: " ",
            weight: 0,
            activeTime: 0,
            plannedWaterIntake: 2.0,
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className={css.form}>
              <label className={css.labelTitle}>
                Calculate your rate:
              </label>
              <div className={css.radioGroup}>
                <label className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="gender"
                    value="woman"
                    className={css.radioInput}
                  />
                  <span className={css.radioMark}></span>
                  For woman
                </label>

                <label className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="gender"
                    value="man"
                    className={css.radioInput}
                  />
                  <span className={css.radioMark}></span>
                  For man
                </label>
              </div>

              <label className={css.label}>
                Your weight in kilograms:
                <Field
                  type="number"
                  name="weight"
                  className={css.input}
                />
              </label>

              <label className={css.label}>
                The time of active participation in sports
                or other activities with a high physical
                load in hours:
                <Field
                  type="number"
                  name="activeTime"
                  className={css.input}
                />
              </label>

              <label className={css.label}>
                The required amount of water in liters per
                day:{" "}
                <span className={css.labelSpam}>
                  {calculateWater(
                    values.gender,
                    values.weight,
                    values.activeTime
                  )}
                  L
                </span>
              </label>

              <label className={css.labelTitle}>
                Write down how much water you will drink:
                <Field
                  type="number"
                  name="plannedWaterIntake"
                  className={css.inputSubmit}
                />
              </label>

              <button className={css.btn} type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default DailyNormaModal;
