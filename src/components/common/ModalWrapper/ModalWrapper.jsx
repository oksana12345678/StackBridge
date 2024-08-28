import Modal from "react-modal";
import css from "./ModalWrapper.module.css";
import { useSelector } from "react-redux";
import { selectIsModalOpen } from "../../../redux/modalWindow/selectors";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({ closeModal, children }) => {
  const isModalOpen = useSelector(selectIsModalOpen);

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
