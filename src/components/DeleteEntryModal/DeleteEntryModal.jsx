import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import css from "./DeleteEntryModal.module.css";
import { closeModal } from "../../redux/modalWindow/slice";
import {
  selectIdToDelete,
  selectIsDeleteEntryModalOpen,
} from "../../redux/modalWindow/selectors";
import { deleteWaterEntry, getWaterForToday } from "../../redux/waterRequests/operations";
import { getWaterForMonth } from "../../redux/monthStats/operations";
import {
  selectCurrentMonth,
  selectCurrentYear,
} from "../../redux/monthStats/selects.js";

const customStyles = {
  content: {
    padding: "32px 24px",
  },
};

export default function DeleteEntryModal() {
  const isDeleteModalOpen = useSelector(selectIsDeleteEntryModalOpen);
  const idToDelete = useSelector(selectIdToDelete);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWaterEntry(idToDelete))
    .unwrap()
    .then(()=>{
      dispatch(getWaterForToday());
      dispatch(getWaterForMonth({ year: currentYear, month: currentMonth + 1 }));
    })
    .catch((err)=>console.log(err));
    dispatch(closeModal());
  };


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
