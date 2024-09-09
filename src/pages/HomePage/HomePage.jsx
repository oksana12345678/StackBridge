import { Helmet } from "react-helmet-async";
import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import { openModal } from "../../redux/modalWindow/slice";
import DailyNormaModal from "../../components/DailyNormaModal/DailyNormaModal";
import { selectIsModalOpen } from "../../redux/modalWindow/selectors";
import HomePageWrapper from "../../components/HomePageWrapper/HomePageWrapper.jsx";

const HomePage = () => {
  const dispatch = useDispatch();

  const modalIsOpen = useSelector(selectIsModalOpen);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>

      <HomePageWrapper>
        <div className={css.homePageContainer}>
          <div className={css.leftSideContainer}>
            <DailyNorma handleOpenModal={handleOpenModal} />
            <WaterRatioPanel />
          </div>
          <div className={css.rightSideContainer}>
            <TodayWaterList />
            <MonthStatsTable />
          </div>
        </div>
      </HomePageWrapper>
      {modalIsOpen && <DailyNormaModal />}
    </>
  );
};

export default HomePage;
