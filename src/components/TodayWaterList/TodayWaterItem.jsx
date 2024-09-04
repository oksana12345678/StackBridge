import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./TodayWaterItem.module.css";

import { deleteWaterEntryThunk } from "../../redux/waterConsumption/operations";
import { HiOutlinePencilSquare as Edit } from "react-icons/hi2";
import { HiOutlineTrash as Trash } from "react-icons/hi2";
import GlassIcon from "./GlassIcon";
// import TodayListModal from "../../components/TodayListModal/TodayListModal";

const TodayWaterItem = ({ id, waterVolume, date }) => {
  const dispatch = useDispatch();

  const [modals, setModals] = useState({
    isModalDelete: false,
    isModalEdit: false,
  });

  const toggleModal = (type) => {
    setModals((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteWaterEntryThunk(id));
      toggleModal("isModalDelete");
    }
  };

  return (
    <li className={css.entryItem}>
      <div className={css.entryInfo}>
        <GlassIcon className={css.glass} />
        <p className={css.amount}>{waterVolume} ml</p>
        <p className={css.time}>{date}</p>
      </div>
      <div className={css.icons}>
        <button className={css.edit} onClick={() => toggleModal("isModalEdit")}>
          <Edit className={css.edit} size={16} />
        </button>
        <button
          className={css.delete}
          onClick={() => toggleModal("isModalDelete")}
        >
          <Trash className={css.delete} size={16} />
        </button>
      </div>

      {/* {modals.isModalEdit && <TodayListModal />} TODO */}

      {/* {modals.isModalDelete && < CONFIRMATION MODAL />} TODO */}
    </li>
  );
};

export default TodayWaterItem;
