import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { useDispatch, useSelector } from 'react-redux';
import css from "./DeleteEntryModal.module.css";
import { closeModal } from "../../redux/modalWindow/slice";
import { selectIsDeleteEntryModalOpen } from "../../redux/modalWindow/selectors";
import { deleteWaterEntryThunk } from "../../redux/waterConsumption/operations";
const customStyles = {
  content: {
    padding: "32px 24px",
  }
};

export default function DeleteEntryModal({id}) {
  console.log(id);
  
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsDeleteEntryModalOpen)
  return (
      <ModalWrapper modalIsOpen={modalIsOpen} closeModal={() => dispatch(closeModal())} customStyles={customStyles} buttonClassLogout={true}>
        <div className={css.modal}>
          <h2 className={css.title}>Delete entry</h2>
          <h3 className={css.text}>Are you sure you want to delete the entry?</h3>
          <div className={css.modalButtons}>
            <button className={css.buttonCancel} onClick={() => dispatch(closeModal())}>Cancel</button>
            <button className={css.buttonLogout} >Delete</button>
          </div>
        </div>
      </ModalWrapper>
  );
}
