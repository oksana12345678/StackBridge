import clsx from "clsx";
import { useId } from "react";
import { PiUploadSimple } from "react-icons/pi";
import css from "./PhotoGroup.module.css";
import settingsCoreCss from "../SettingModal.module.css";

const PhotoGroup = ({ avatar, isSubmitBlocked, handleAvatarChange }) => {
  const fileInputId = useId();

  return (
    <div className={settingsCoreCss["photo-group"]}>
      <h3 className={settingsCoreCss.subtitle}>Your photo</h3>
      <div className={css["photo-flex"]}>
        <div className={css["avatar-container"]}>
          <img className={css.avatar} src={avatar} alt="avatar" />
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
  );
};

export default PhotoGroup;
