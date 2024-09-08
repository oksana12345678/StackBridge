import { useDispatch, useSelector } from "react-redux";
import css from "./TodayWaterItem.module.css";
import { HiOutlinePencilSquare as Edit } from "react-icons/hi2";
import { HiOutlineTrash as Trash } from "react-icons/hi2";
import GlassIcon from "./GlassIcon";
import TodayListModal from "../TodayListModal/TodayListModal";
import {
  editWaterModalOpen,
  deleteEntryModalOpen,
} from "../../redux/modalWindow/slice";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import { selectIdToEdit } from "../../redux/modalWindow/selectors";

const TodayWaterItem = ({ id, waterVolume, date, waterNotes }) => {
  const dispatch = useDispatch();
  const idToEdit = useSelector(selectIdToEdit);

  const handleDelete = () => {
    dispatch(deleteEntryModalOpen(id)); 
  };

  const handleEdit = () => {
    dispatch(editWaterModalOpen(id)); 
  };

  return (
    <li key={id} className={css.entryItem}>
      <div className={css.entryInfo}>
        <GlassIcon className={css.glass} />
        <p className={css.amount}>{waterVolume} ml</p>
        <p className={css.time}>{date}</p>
      </div>
      <div className={css.icons}>
        <button className={css.edit} onClick={handleEdit}>
          <Edit className={css.edit} size={16} />
        </button>
        <button className={css.delete} onClick={handleDelete}>
          <Trash className={css.delete} size={16} />
        </button>
      </div>
      {idToEdit === id && (
        <TodayListModal waterVolume={waterVolume} date={date} />
      )}
      <DeleteEntryModal /> 
    </li>
  );
};

export default TodayWaterItem;
