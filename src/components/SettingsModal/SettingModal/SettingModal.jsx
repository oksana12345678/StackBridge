import { useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modalWindow/slice";
import { selectIsSettingModalOpen } from "../../../redux/modalWindow/selectors";
import { selectUserEmail } from "../../../redux/auth/selectors";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import clsx from "clsx";
import ModalWrapper from "../../common/ModalWrapper/ModalWrapper";
import FormTitle from "./FormTitle/FormTitle";
import RadioContainer from "./RadioContainer/RadioContainer";
import Label from "./Label/Label";
import { PiUploadSimple } from "react-icons/pi";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import userPic from "../../../../public/userPic.png";
import * as Yup from "yup";
import css from "./SettingModal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { updateAvatar, updateUser } from "../../../redux/auth/operations";

const showToast = (message, type) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "success" ? "light" : "colored",
    type: type,
  });
};
const SettingModal = () => {
  const isModalOpen = useSelector(selectIsSettingModalOpen);
  const user = useSelector(selectUserEmail);
  const defaultAvatar = userPic;
  const dispatch = useDispatch();

  const initialValues = {
    email: user.email || "",
    name: user.name || "",
    gender: user.gender,
    avatar: user.avatar || "",
    outdatedPassword: "",
    password: "",
    repeatPassword: "",
  };

  let patchedData = {};

  const nameInputId = useId();
  const emailInputId = useId();
  const fileInputId = useId();
  const womanRadioId = useId();
  const manRadioId = useId();
  const oldPasswordInputId = useId();
  const passwordInputId = useId();
  const repeatPasswordInputId = useId();

  const userInfoValidationSchema = Yup.object({
    name: Yup.string()
      .max(3, "Your name shouldn't exceed min 3 characters")
      .max(32, "Your name shouldn't exceed 32 characters"),
    email: Yup.string().email("Invalid email address"),
    outdatedPassword: Yup.string()
      .min(8, "Your password should contain at least 8 characters")
      .max(64, "Your password shouldn't exceed 64 characters"),
    password: Yup.string()
      .min(8, "Your password should contain at least 8 characters")
      .max(64, "Your password shouldn't exceed 64 characters"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const [showPasswords, setShowPasswords] = useState([]);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);

  const handleShownPasswords = (type) => {
    setShowPasswords((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  function areEqualWithNull(values, user) {
    for (let key in values) {
      const formValue = values[key];
      const userValue = user[key];
      if (formValue !== (userValue ?? "")) {
        patchedData[key] = formValue;
      }
    }
    return patchedData;
  }
  const onSubmit = (values) => {
    setIsSubmitBlocked(true);
    setTimeout(() => {
      setIsSubmitBlocked(false);
    }, 6000);
    const { password, outdatedPassword, repeatPassword } = values;
    delete values["avatar"];
    patchedData = areEqualWithNull(values, user);

    if (Object.keys(patchedData).length == 0) {
      showToast("You have not made any changes.", "error");
    } else {
      if (outdatedPassword != "" || password != "" || repeatPassword != "") {
        if (outdatedPassword == password) {
          showToast(
            "New password cannot be the same as the old password.",
            "error"
          );
        } else if (
          outdatedPassword == "" ||
          password == "" ||
          repeatPassword == ""
        ) {
          showToast("Fill in all fields with passwords.", "error");
        } else {
          const keysForDelete = [
            "outdatedPassword",
            "password",
            "repeatPassword",
          ];
          keysForDelete.forEach((key) => {
            delete patchedData[key];
          });
          dispatch(
            updateUser({
              ...patchedData,
              password: outdatedPassword,
              newPassword: repeatPassword,
            })
          )
            .unwrap()
            .then(() => {
              showToast("Successfully changed information.", "success");
            })
            .catch((err) => {
              if (err == "Request failed with status code 401")
                showToast("Incorrect outdated password", "error");
              else showToast("Error, try later!", "error");
            });
        }
      } else {
        dispatch(updateUser(patchedData))
          .unwrap()
          .then(() => {
            showToast("Successfully changed information.", "success");
          })
          .catch(() => showToast("Error, try later!", "error"));
      }
    }

    patchedData = {};
  };
  const handleAvatarChange = (e) => {
    setIsSubmitBlocked(true);
    setTimeout(() => {
      setIsSubmitBlocked(false);
    }, 6000);
    const file = e.target.files[0];
    if (file) {
      dispatch(updateAvatar({ avatar: file }))
        .unwrap()
        .then(() => {
          showToast("Avatar changed!", "success");
        })
        .catch(() => {
          showToast("Error, try later!", "error");
        });
    }
  };
  return (
    <ModalWrapper
      modalIsOpen={isModalOpen}
      closeModal={() => dispatch(closeModal())}
      customStyles={{
        content: {
          paddingTop: "32px",
          paddingBottom: "32px",
        },
      }}
    >
      <ToastContainer />
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
                  <img className={css.avatar} src={user.avatar} alt="avatar" />
                </div>
                <div>
                  <div className={css["upload-button"]} type="button">
                    <label
                      htmlFor={fileInputId}
                      className={clsx(
                        css["file-upload-label"],
                        isSubmitBlocked && css["blocked-upload"]
                      )}
                    >
                      <PiUploadSimple
                        className={clsx(
                          css["upload-icon"],
                          isSubmitBlocked && css["blocked-upload"]
                        )}
                      />
                      Upload a photo
                    </label>
                    <input
                      disabled={isSubmitBlocked}
                      id={fileInputId}
                      type="file"
                      className={css["file-input"]}
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleAvatarChange}
                    />
                  </div>
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
                      <ErrorMessage
                        name="name"
                        component="div"
                        className={css["error-message"]}
                      />
                    </div>
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
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={css["error-message"]}
                      />
                    </div>
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
                        <button
                          className={css["eye-button"]}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("old");
                          }}
                        >
                          <HiOutlineEye className={css["eye-icon"]} />
                        </button>
                      ) : (
                        <button
                          className={css["eye-button"]}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("old");
                          }}
                        >
                          <HiOutlineEyeOff className={css["eye-icon"]} />
                        </button>
                      )}{" "}
                      <ErrorMessage
                        name="outdatedPassword"
                        component="div"
                        className={css["error-message"]}
                      />
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
                        <button
                          className={css["eye-button"]}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("new");
                          }}
                        >
                          <HiOutlineEye className={css["eye-icon"]} />
                        </button>
                      ) : (
                        <button
                          className={css["eye-button"]}
                          onClick={(event) => {
                            event.preventDefault();
                            handleShownPasswords("new");
                          }}
                        >
                          <HiOutlineEyeOff className={css["eye-icon"]} />
                        </button>
                      )}
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={css["error-message"]}
                      />
                    </div>
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
                          <button
                            class={css["eye-button"]}
                            onClick={(event) => {
                              event.preventDefault();
                              handleShownPasswords("repeat");
                            }}
                          >
                            <HiOutlineEye className={css["eye-icon"]} />
                          </button>
                        ) : (
                          <button
                            className={css["eye-button"]}
                            onClick={(event) => {
                              event.preventDefault();
                              handleShownPasswords("repeat");
                            }}
                          >
                            <HiOutlineEyeOff className={css["eye-icon"]} />
                          </button>
                        )}{" "}
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
            </div>
            <div className={css["button-container"]}>
              <button
                className={css["submit-button"]}
                type="submit"
                disabled={isSubmitBlocked}
              >
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
