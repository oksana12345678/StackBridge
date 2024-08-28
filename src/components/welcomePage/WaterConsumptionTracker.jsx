// import { useHistory } from 'react-router-dom';
import styles from './WaterConsumptionTracker.module.css';

const WaterConsumptionTracker = () => {
//   const history = useHistory();

//   const handleTryTrackerClick = () => {
//     history.push('/signup');
//   };

  return (
    <div className={styles.trackerContainer}>
      <h1>Water consumption tracker</h1>
      <h2>Record daily water intake and track</h2>
      <div className={styles.trackerBenefits}>
        <div className={styles.benefitItem}>
          <i className="icon habit-drive"></i>
          <span>Habit drive</span>
        </div>
        <div className={styles.benefitItem}>
          <i className="icon view-statistics"></i>
          <span>View statistics</span>
        </div>
        <div className={styles.benefitItem}>
          <i className="icon personal-rate"></i>
          <span>Personal rate setting</span>
        </div>
      </div>
      {/* <button onClick={handleTryTrackerClick}>Try tracker</button> */}
    </div>
  );
};

export default WaterConsumptionTracker;
