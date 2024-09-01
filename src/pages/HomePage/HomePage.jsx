import { Helmet } from "react-helmet-async";
import { useEffect, useCallback } from "react";
import css from "./HomePage.module.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectWaterError } from "../../redux/waterConsumption/selectors";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";

const HomePage = () => {
  // const error = useSelector(selectWaterError);

  // const handleError = useCallback(() => {
  //   const errorMessages = {
  //     400: "Something went wrong. Please try again later.",
  //     401: "Authorization failed. Please try again.",
  //     500: "A server error occurred. Please try again later.",
  //   };

  //   const messageKey = errorMessages[error?.errorCode];
  //   if (messageKey) {
  //     toast.error(messageKey);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   handleError();
  // }, [handleError]);

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>

      <section className={css.section}>
        <div className={css.background}>
          <div className={css.container}>
            <div className={css.leftSection}>
              <DailyNorma />
              <WaterRatioPanel />
            </div>

            <div className={css.rightSectionWrapper}>
              <div className={css.rightSection}>
                <TodayWaterList />
                <MonthStatsTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
