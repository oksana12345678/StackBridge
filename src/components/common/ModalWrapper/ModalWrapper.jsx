import Modal from "react-modal";
import css from "./ModalWrapper.module.css";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({ modalIsOpen, closeModal, children }) => {
  // scroll 
  return (
    <Modal
      isOpen={modalIsOpen}
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
