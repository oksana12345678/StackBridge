import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useId, useState } from "react";
import * as Yup from "yup";
import showToast from "../showToast";
import css from "./DailyNormaModal.module.css";
import RadioPair from "../common/RadioPair/RadioPair";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { selectIsModalOpen } from "../../redux/modalWindow/selectors";
import { updateWaterRate } from "../../redux/waterRate/operations";
// import { fetchUserData } from "../../redux/user/operations";
import { selectUserGender } from "../../redux/user/selectors";

const PlannedWaterIntakeSchema = Yup.object().shape({
  plannedWaterIntake: Yup.number()
    .min(0.1, "Min 0.1ml")
    .max(15, "Max 15l")
    .required("Required"),
});

const calculateWater = (gender, weight, activeTime) => {
  const numericWeight = Number(weight);
  const numericActiveTime = Number(activeTime);

  if (!numericWeight || numericWeight <= 0) return "2";

  if (gender === "man") {
    return (
      numericWeight * 0.04 +
      numericActiveTime * 0.6
    ).toFixed(1);
  } else {
    return (
      numericWeight * 0.03 +
      numericActiveTime * 0.4
    ).toFixed(1);
  }
};

const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const gender = useSelector(selectUserGender);
  const [initialValues, setInitialValues] = useState({
    gender: gender,
    weight: "",
    activeTime: "",
    plannedWaterIntake: "",
  });

  const namePlannedWaterIntakeId = useId();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      gender: gender || "",
    }));
  }, [gender]);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     dispatch(fetchUserData()).then((action) => {
  //       if (fetchUserData.fulfilled.match(action)) {
  //         const { gender } = action.payload;
  //         setInitialValues({
  //           gender: gender || "",
  //           weight: "",
  //           activeTime: "",
  //           plannedWaterIntake: "",
  //         });
  //       }
  //     });
  //   }
  // }, [isModalOpen, dispatch]);

  const handleSubmit = async (values, actions) => {
    const waterRate =
      Number(values.plannedWaterIntake) * 1000;

    try {
      await dispatch(
        updateWaterRate({ waterRate: waterRate })
      ).unwrap();
      actions.resetForm();
      handleCloseModal();
    } catch (error) {
      showToast(
        `Oops something went wrong! ${error}`,
        "error"
      );
    }
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
          enableReinitialize
          initialValues={initialValues}
          validationSchema={PlannedWaterIntakeSchema}
          onSubmit={(values, actions) =>
            handleSubmit(values, actions, handleCloseModal)
          }
        >
          {({ values, errors, touched }) => (
            <Form className={css.form}>
              <label className={css.labelTitle}>
                Calculate your rate:
              </label>

              <RadioPair
                labelLeft="For woman"
                labelRight="For man"
              />

              <label className={css.label}>
                Your weight in kilograms:
                <Field
                  type="text"
                  name="weight"
                  placeholder="0"
                  onInput={handleNumberInput}
                  className={css.input}
                />
              </label>

              <label className={css.label}>
                The time of active participation in sports
                or other activities with a high physical
                load in hours:
                <Field
                  type="text"
                  name="activeTime"
                  onInput={handleNumberInput}
                  placeholder="0"
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
                  type="text"
                  name="plannedWaterIntake"
                  placeholder="0.1 - 15L"
                  onInput={handleNumberInput}
                  id={namePlannedWaterIntakeId}
                  className={`${css.inputSubmit} ${
                    errors.plannedWaterIntake &&
                    touched.plannedWaterIntake
                      ? css.inputSubmitError
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="plannedWaterIntake"
                  component="span"
                  className={css.errorMsg}
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

const handleNumberInput = (e) => {
  const { value } = e.target;
  const validValue = value.replace(/[^0-9.]/g, "");
  e.target.value = validValue;
};
