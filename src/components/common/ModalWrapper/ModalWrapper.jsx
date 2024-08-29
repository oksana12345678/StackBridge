import Modal from "react-modal";
import css from "./ModalWrapper.module.css";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({ isModalOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className={css.modal}
      overlayClassName={css.backdrop}
    >
      {children}
      {/* КНОПКУ ЗАКРИТТЯ ДОДАМ ПІЗНІШЕ ЯК БУДЕ SVG */}
    </Modal>
  );
};

export default ModalWrapper;
