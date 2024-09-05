import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalWindow/slice";
import { selectIsSettingModalOpen } from "../../redux/modalWindow/selectors";
import { selectUserEmail } from "../../redux/auth/selectors";
import { updateAvatar, updateUser } from "../../redux/auth/operations";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import showToast from "../showToast";
import { useToggle } from "../../hooks/useToggle";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import FormTitle from "./FormTitle/FormTitle";
import GenderIdentityGroup from "./GenderIdentityGroup/GenderIdentityGroup";
import PhotoGroup from "./PhotoGroup/PhotoGroup";
import NameGroup from "./NameGroup";
import EmailGroup from "./EmailGroup/EmailGroup";
import OldPasswordGroup from "./OldPasswordGroup";
import NewPasswordGroup from "./NewPasswordGroup";
import RepeatPasswordGroup from "./RepeatPasswordGroup";
import css from "./SettingModal.module.css";

const SettingModal = () => {
  const isModalOpen = useSelector(selectIsSettingModalOpen);
  const user = useSelector(selectUserEmail);
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

  const checkPasswordFieldsTest = (value, context) => {
    const { outdatedPassword, password, repeatPassword } = context.parent;

    if (outdatedPassword || password || repeatPassword) {
      if (!outdatedPassword || !password || !repeatPassword) {
        return context.createError({
          message: "All password fields must be filled if any is filled",
        });
      }
    }
    return true;
  };

  const userInfoValidationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Your name shouldn't be less than 3 characters")
      .max(32, "Your name shouldn't exceed 32 characters"),
    email: Yup.string().email("Invalid email address"),
    outdatedPassword: Yup.string()
      .min(8, "Your password should contain at least 8 characters")
      .max(64, "Your password shouldn't exceed 64 characters"),
    password: Yup.string()
      .min(8, "Your password should contain at least 8 characters")
      .max(64, "Your password shouldn't exceed 64 characters"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .test(
        "checkPasswordFields",
        "All password fields must be filled if any is filled",
        checkPasswordFieldsTest
      ),
  });

  const [state, toggle] = useToggle();
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);

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
      <FormTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={userInfoValidationSchema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        {({ errors, touched }) => (
          <Form className={css["form-container"]} autoComplete="off">
            <PhotoGroup
              avatar={user.avatar}
              isSubmitBlocked={isSubmitBlocked}
              handleAvatarChange={handleAvatarChange}
            />
            <div className={css["desktop-flex"]}>
              <div className={css["desktop-left"]}>
                <GenderIdentityGroup />
                <NameGroup isError={errors.name} isTouched={touched.name} />
                <EmailGroup isError={errors.email} isTouched={touched.email} />
              </div>
              <div className={css["desktop-right"]}>
                <h3 className={css.subtitle}>Password</h3>
                <div className={css["password-group"]}>
                  <OldPasswordGroup
                    isHiddenPassword={state.oldPassword}
                    toggle={toggle}
                    isError={errors.outdatedPassword}
                    isTouched={touched.outdatedPassword}
                  />
                  <NewPasswordGroup
                    isHiddenPassword={state.password}
                    toggle={toggle}
                    isError={errors.password}
                    isTouched={touched.password}
                  />
                  <RepeatPasswordGroup
                    isHiddenPassword={state.repeatPassword}
                    toggle={toggle}
                    isError={errors.repeatPassword}
                    isTouched={touched.repeatPassword}
                  />
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