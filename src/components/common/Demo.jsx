import { useState } from "react";
import Section from "./Section/Section";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Container from "./Container/Container";
import Button from "./Button/Button";
import Toaster from "./Toaster/Toaster";
import Input from "./Input/Input";
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
    <Section>
      <Container>
        <div className={css["buttons-container"]}>
          <Button onClick={openModal}>Modal</Button>
          <Button onClick={openToaster}>Toaster</Button>
        </div>
        <Input type="text" placeholder="David" />
        <ModalWrapper modalIsOpen={modalIsOpen} closeModal={closeModal}>
          Усередені будь-що
        </ModalWrapper>
        <Toaster
          toasterIsOpen={toasterIsOpen}
          closeToaster={closeToaster}
          message="Будь-яке повідомлення"
          type="error"
        />
      </Container>
    </Section>
  );
};

export default Demo;
