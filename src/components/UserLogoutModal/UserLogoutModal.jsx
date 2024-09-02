import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../../redux/auth/operations";
import css from "./UserLogoutModal.module.css";
import { selectLogOutModal } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
const customStyles = {
  content: {
    padding: "32px 24px",
  }
};

export default function UserLogoutModal() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectLogOutModal)
  return (
      <ModalWrapper modalIsOpen={modalIsOpen} closeModal={() => dispatch(closeModal())} customStyles={customStyles} buttonClassLogout={true}>
        <div className={css.modal}>
          <h2 className={css.title}>Log out</h2>
          <h3 className={css.text}>Do you really want to leave?</h3>
          <div className={css.modalButtons}>
            <button className={css.buttonCancel} onClick={() => dispatch(closeModal())}>Cancel</button>
            <button className={css.buttonLogout} onClick={()=>{dispatch(logOut())}}>Log out</button>
          </div>
        </div>
      </ModalWrapper>
  );
}
