import { useEffect } from "react";
import Modal from "react-modal";
import css from "./ModalWrapper.module.css";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({
  modalIsOpen,
  closeModal,
  children,
}) => {
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add(css["no-scroll"]);
    } else {
      document.body.classList.remove(css["no-scroll"]);
    }
    return () => {
      document.body.classList.remove(css["no-scroll"]);
    };
  }, [modalIsOpen]);

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

      <button
        className={css["close-button"]}
        onClick={closeModal}
      >
        {/* ЦЕ ЧОМУСЬ НЕ ПРАЦЮЄ, ТОМУ ПОКИ ВАРІНТ НИЖЧЕ */}
        {/* <svg className={css["close-icon"]} width="24" height="24">
          <use href="../../../Icons/sprite.svg#close-cross"></use>
        </svg> */}
        <svg
          className={css["close-icon"]}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="#407bff"
            strokeWidth="2"
            d="M8 24l16-16M8 8l16 16"
          />
        </svg>
      </button>
    </Modal>
  );
};

export default ModalWrapper;
