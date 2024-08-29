// import { useHistory } from 'react-router-dom';
import styles from './WaterConsumptionTracker.module.css';


const WaterConsumptionTracker = () => {
  // const history = useHistory();

  // const handleTryTrackerClick = () => {
  //   history.push('/signup');
  // };

  return (
    <div className={styles.trackerWelcomeContainer}>
      <h1 className={styles.trackerWelcomeTitle}>Water consumption tracker</h1>
      <h2 className={styles.trackerWelcomeSecondTitle}>Record daily water intake and track</h2>
      <h3 className={styles.trackerWelcomeThirdTitle}>Tracker Benefits</h3>
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
      <button>Try tracker</button>
    </div>
  );
};

export default WaterConsumptionTracker;
