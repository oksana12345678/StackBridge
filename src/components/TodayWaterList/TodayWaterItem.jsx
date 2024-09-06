import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./TodayWaterItem.module.css";
// import { deleteWaterEntry } from "../../redux/waterRequests/operations";
import { HiOutlinePencilSquare as Edit } from "react-icons/hi2";
import { HiOutlineTrash as Trash } from "react-icons/hi2";
import GlassIcon from "./GlassIcon";
import TodayListModal from "../TodayListModal/TodayListModal";
import {
  addWaterModalOpen,
  deleteEntryModalOpen,
} from "../../redux/modalWindow/slice";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";

const TodayWaterItem = ({ id, waterVolume, date }) => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    isModalDelete: false,
    isModalEdit: false,
  });

  const handleDelete = () => {
    dispatch(deleteEntryModalOpen(id));
  };

  return (
    <li key={id} className={css.entryItem}>
      <div className={css.entryInfo}>
        <GlassIcon className={css.glass} />
        <p className={css.amount}>{waterVolume} ml</p>
        <p className={css.time}>{date}</p>
      </div>
      <div className={css.icons}>
        <button
          className={css.edit}
          onClick={() => dispatch(addWaterModalOpen())}
        >
          <Edit className={css.edit} size={16} />
        </button>
        <button className={css.delete} onClick={handleDelete}>
          <Trash className={css.delete} size={16} />
        </button>
      </div>
      <TodayListModal waterNote={{ id, waterVolume, date }} />

      {/* {modals.isModalEdit && <TodayListModal />} TODO */}

      <DeleteEntryModal id={id} />
    </li>
  );
};

export default TodayWaterItem;
