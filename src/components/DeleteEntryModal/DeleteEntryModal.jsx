import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import css from "./DeleteEntryModal.module.css";
import { closeModal } from "../../redux/modalWindow/slice";
import {
  selectIdToDelete,
  selectIsDeleteEntryModalOpen,
} from "../../redux/modalWindow/selectors";
import { deleteWaterEntry } from "../../redux/waterRequests/operations";
const customStyles = {
  content: {
    padding: "32px 24px",
  },
};

export default function DeleteEntryModal() {
  const isDeleteModalOpen = useSelector(selectIsDeleteEntryModalOpen);
  const idToDelete = useSelector(selectIdToDelete);

  const handleDelete = () => {
    console.log("Deleting entry with id:", idToDelete);

    dispatch(deleteWaterEntry(idToDelete));
    dispatch(closeModal());
  };
  // console.log(id);
  const dispatch = useDispatch();
  return (
    <ModalWrapper
      modalIsOpen={isDeleteModalOpen}
      closeModal={() => dispatch(closeModal())}
      customStyles={customStyles}
      buttonClassLogout={true}
    >
      <div className={css.modal}>
        <h2 className={css.title}>Delete entry</h2>
        <h3 className={css.text}>Are you sure you want to delete the entry?</h3>
        <div className={css.modalButtons}>
          <button
            className={css.buttonCancel}
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
          <button className={css.buttonLogout} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
