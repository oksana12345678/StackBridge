import { useState } from "react";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Button from "./Button/Button";
import Toaster from "./Toaster/Toaster";
import css from "./Demo.module.css";

const Demo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toasterIsOpen, setIsToasterOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openToaster = () => {
    setIsToasterOpen(true);
  };

  const closeToaster = () => {
    setIsToasterOpen(false);
  };

  return (
    <div className={css["buttons-container"]}>
      <Button onClick={openModal}>ОБГОРТКА МОДАЛОК</Button>
      <Button onClick={openToaster}>ТОСТЕР</Button>
      <ModalWrapper modalIsOpen={modalIsOpen} closeModal={closeModal}>
        Усередені будь-що
      </ModalWrapper>
      <Toaster
        toasterIsOpen={toasterIsOpen}
        closeToaster={closeToaster}
        message="Будь-яке повідомлення"
      />
    </div>
  );
};

export default Demo;
