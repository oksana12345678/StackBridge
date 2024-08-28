import Modal from "react-modal";
import css from "./ModalWrapper.module.css";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({ modalIsOpen, closeModal, children }) => {
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
      {/* НАШУ ІКОНКУ ДОДАМ ПІЗНІШЕ ЯК БУДЕ SVG */}
      <button className={css["close-button"]} onClick={closeModal}>
        <IoMdClose className={css["close-icon"]} />
      </button>
    </Modal>
  );
};

export default ModalWrapper;
