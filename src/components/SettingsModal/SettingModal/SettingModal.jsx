import { useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modalWindow/slice";
import { selectIsSettingModalOpen } from "../../../redux/modalWindow/selectors";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import clsx from "clsx";
import ModalWrapper from "../../common/ModalWrapper/ModalWrapper";
import FormTitle from "./FormTitle/FormTitle";
import RadioContainer from "./RadioContainer/RadioContainer";
import Label from "./Label/Label";
import { PiUploadSimple } from "react-icons/pi";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import userPic from "../../../../public/userPic.png"
import * as Yup from "yup";
import css from "./SettingModal.module.css";

const SettingModal = () => {
  const isModalOpen = useSelector(selectIsSettingModalOpen);

  const defaultAvatar = userPic;
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    name: "",
    gender: "",
    avatar: "",
    outdatedPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const nameInputId = useId();
  const emailInputId = useId();
  const fileInputId = useId();
  const womanRadioId = useId();
  const manRadioId = useId();
  const oldPasswordInputId = useId();
  const passwordInputId = useId();
  const repeatPasswordInputId = useId();

  const userInfoValidationSchema = Yup.object({
    name: Yup.string().max(32, "Your name shouldn't exceed 32 characters"),
    email: Yup.string().email("Invalid email address"),
    password: Yup.string()
      .min(8, "Your password should contain at least 8 characters")
      .max(64, "Your password shouldn't exceed 64 characters"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const [showPasswords, setShowPasswords] = useState([]);

  const handleShownPasswords = (type) => {
    setShowPasswords((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <ModalWrapper
      modalIsOpen={isModalOpen}
      closeModal={() => dispatch(closeModal())}
    >
      <FormTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={userInfoValidationSchema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        {({ errors, touched }) => (
          <Form className={css["form-container"]}>
            {/* ==================================================== PHOTO GROUP ============================================= */}
            <div className={css["photo-group"]}>
              <h3 className={css.subtitle}>Your photo</h3>
              <div className={css["photo-flex"]}>
                <div className={css["avatar-container"]}>
                  <img src={defaultAvatar} alt="avatar" />
                </div>
                <div>
                  <button className={css["upload-button"]}>
                    <label
                      htmlFor={fileInputId}
                      className={css["file-upload-label"]}
                    >
                      <PiUploadSimple className={css["upload-icon"]} />
                      Upload a photo
                    </label>
                    <input
                      id={fileInputId}
                      type="file"
                      className={css["file-input"]}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={css["desktop-flex"]}>
              <div className={css["desktop-left"]}>
                {/* ============================================== GENDER IDENTITY GROUP =========================================================*/}
                <div className={css["gender-identity-group"]}>
                  <h3 className={css.subtitle}>Your gender identity</h3>
                  <RadioContainer>
                    <label
                      htmlFor={womanRadioId}
                      className={css["radio-label"]}
                    >
                      <Field
                        id={womanRadioId}
                        className={css["original-radio"]}
                        type="radio"
                        name="gender"
                        value="woman"
                      />
                      <IoIosRadioButtonOff
                        className={clsx(
                          css["custom-radio-initial"],
                          css["custom-radio"]
                        )}
                      />
                      <IoMdRadioButtonOn
                        className={clsx(
                          css["custom-radio-checked"],
                          css["custom-radio"]
                        )}
                      />
                      Woman
                    </label>
                    <label htmlFor={manRadioId} className={css["radio-label"]}>
                      <Field
                        id={manRadioId}
                        className={css["original-radio"]}
                        type="radio"
                        name="gender"
                        value="man"
                      />
                      <IoIosRadioButtonOff
                        className={clsx(
                          css["custom-radio-initial"],
                          css["custom-radio"]
                        )}
                      />
                      <IoMdRadioButtonOn
                        className={clsx(
                          css["custom-radio-checked"],
                          css["custom-radio"]
                        )}
                      />
                      Man
                    </label>
                  </RadioContainer>
                </div>
                {/* ==================================================== NAME-GROUP ================================================= */}
                <div className={css["name-group"]}>
                  <Label htmlFor={nameInputId} type="thick">
                    Your name
                  </Label>
                  <div>
                    <div className={css["input-wrapper"]}>
                      <Field
                        className={clsx(css.input, {
                          [css["error-input"]]: errors.name && touched.name,
                        })}
                        id={nameInputId}
                        type="text"
                        name="name"
                        placeholder="name"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css["error-message"]}
                    />
                  </div>
                </div>
                {/* ==================================================== EMAIL GROUP =========================================================*/}
                <div className={css["email-group"]}>
                  <Label htmlFor={emailInputId} type="thick">
                    E-mail
                  </Label>
                  <div>
                    <div className={css["input-wrapper"]}>
                      <Field
                        className={clsx(css.input, {
                          [css["error-input"]]: errors.email && touched.email,
                        })}
                        id={emailInputId}
                        type="email"
                        name="email"
                        placeholder="email"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={css["error-message"]}
                    />
                  </div>
                </div>
              </div>
              <div className={css["desktop-right"]}>
                {/* ==================================================== PASSWORD GROUP ====================================================== */}
                <h3 className={css.subtitle}>Password</h3>
                <div className={css["password-group"]}>
                  {/* ================================================== OLD PASSWORD ======================================================= */}
                  <div className={css["password-sub-group"]}>
                    <Label htmlFor={oldPasswordInputId} type="thin">
                      Outdated password:
                    </Label>
                    <div className={css["input-wrapper"]}>
                      <Field
                        className={css.input}
                        id={oldPasswordInputId}
                        type={
                          showPasswords.includes("old") ? "text" : "password"
                        }
                        name="outdatedPassword"
                        placeholder="Password"
                      />
                      {showPasswords.includes("old") ? (
                        <FaEye
                          className={css.faEye}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("old");
                          }}
                        />
                      ) : (
                        <FaEyeSlash
                          className={css.faEye}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("old");
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {/* ====================================================== NEW PASSWORD ================================================= */}
                  <div className={css["password-sub-group"]}>
                    <Label htmlFor={passwordInputId} type="thin">
                      New Password:
                    </Label>
                    <div className={css["input-wrapper"]}>
                      <Field
                        className={clsx(css.input, {
                          [css["error-input"]]:
                            errors.password && touched.password,
                        })}
                        id={passwordInputId}
                        type={
                          showPasswords.includes("new") ? "text" : "password"
                        }
                        name="password"
                        placeholder="Password"
                      />
                      {showPasswords.includes("new") ? (
                        <FaEye
                          className={css.faEye}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("new");
                          }}
                        />
                      ) : (
                        <FaEyeSlash
                          className={css.faEye}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("new");
                          }}
                        />
                      )}
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={css["error-message"]}
                    />
                  </div>
                  {/* ===================================================== REPEAT NEW PASSWORD ============================================ */}
                  <div className={css["password-sub-group"]}>
                    <Label htmlFor={repeatPasswordInputId} type="thin">
                      Repeat new password:
                    </Label>
                    <div>
                      <div className={css["input-wrapper"]}>
                        <Field
                          className={clsx(css.input, {
                            [css["error-input"]]:
                              errors.repeatPassword && touched.repeatPassword,
                          })}
                          id={repeatPasswordInputId}
                          type={
                            showPasswords.includes("repeat")
                              ? "text"
                              : "password"
                          }
                          name="repeatPassword"
                          placeholder="Password"
                        />
                        {showPasswords.includes("repeat") ? (
                          <FaEye
                            className={css.faEye}
                            onClick={(event) => {
                              event.preventDefault();
                              handleShownPasswords("repeat");
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            className={css.faEye}
                            onClick={(event) => {
                              event.preventDefault();
                              handleShownPasswords("repeat");
                            }}
                          />
                        )}
                      </div>
                      <ErrorMessage
                        name="repeatPassword"
                        component="div"
                        className={css["error-message"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css["button-container"]}>
              <button className={css["submit-button"]} type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default SettingModal;

// GIT PULL
// NEW BRANCH
// FIX NOT CLOSABLE MODAL
// SUBMIT PULL REQUEST
// WRITE TO LYOSHA ABOUT REDUX + TASKS HE NEEDS TO DO + SOME REMARKS ABOUT ICONS ETC

// REGISTER
// ПЕРЕЗАВАНТАЖИТИ СТОРІНКУ ДЛЯ РЕФРЕШУ ЮЗЕРА
// ДОДАТИ ДО РІДАКСУ ДАНІ, ЩО Я ХОЧУ ОБИРАТИ СЕЛЕКТОРАМИ (do waht Anna recommended)
// ДОДАТИ СЕЛЕКТОР ЮЗЕРА
// ОТРИМАТИ ДАНІ У СВОЇЙ МОДАЛЬЦІ
// ДОДАТИ ПОЧАТКОВІ ЗНАЧЕННЯ ДЛЯ АВАТАРУ, ІМЕНІ, ІМЕЙЛУ, СТАТІ
// ПАРОЛЬ МАЄ БУТИ НЕАКТИВНИМ
// НАПИСАТИ ОПЕРАЦІЮ ДЛЯ ОНОВЛЕННЯ ФОТО
// НАПИСАТИ РЕДЬЮСЕРИ ДЛЯ ОНОВЛЕННЯ ФОТО
// ТЕ Ж САМЕ ДЛЯ ЗМІНИ ДАНИХ
// ДАНІ З ПАРОЛЕМ ВІДПРАВЛЯЮТЬСЯ ЛИШЕ ЯКЩО ЮЗЕР ВИРІШИВ ЗМІНИТИ
// НЕВАЛІДНІ АБО ВАЛІДНІ ДАНІ - ВІДПОВІДНЕ ПОВІДОМЛЕННЯ
// MODAL IS OPEN WHEN SEEING NOTIFICATIONS
// MODAL IS CLOSED AFTER SUCCESSFUL SERVER UPDATE
// VALIDATION STYLES
// NOT CLOSABLE MODAL BY CLICKING ON BACKDROP
// ADD AN EYE

// ЗАПИТАТИ У ІНШИХ ПРО РАДІО
// ЗАПИТАТИ НА ЗІДЗВОНІ ЗА ОКО
/* ADD ICON THAT WILL SWITCH BETWEEN TEXT AND PASSWORD STATES + IMPLEMENT THIS FEATURE */
// gender validation handling
// labels always wraps the component
// what's the point of checking outdated password
// timeout for showing an errro
// which photo should it be
// fix button position
// refactor not not use too many styled microcomponents
