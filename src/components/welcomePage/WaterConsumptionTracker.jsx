import { useNavigate } from 'react-router-dom';
import styles from './WaterConsumptionTracker.module.css';
import CalendarIcon from '../../Images/welcome-page/Calendar.svg';
import StatsIcon from '../../Images/welcome-page/Statistics.svg';
import SettingsIcon from '../../Images/welcome-page/Setting.svg';



const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
      navigate('/signup');
  };

  return (
    <div className={styles.trackerWelcomeContainer}>
      <h1 className={styles.trackerWelcomeTitle}>Water consumption tracker</h1>
      <h2 className={styles.trackerWelcomeSecondTitle}>Record daily water intake and track</h2>
      <h3 className={styles.trackerWelcomeThirdTitle}>Tracker Benefits</h3>
      <div className={styles.trackerBenefits}>
        <div className={styles.benefitItem}>
          <img src={CalendarIcon} alt="Habit drive" className={styles.icon} />
          <span>Habit drive</span>
        </div>
        <div className={styles.benefitItem}>
          <img src={StatsIcon} alt="View statistics" className={styles.icon} />
          <span>View statistics</span>
        </div>
        <div className={styles.benefitItem}>
          <img src={SettingsIcon} alt="Personal rate setting" className={styles.icon} />
          <span>Personal rate setting</span>
        </div>
      </div>
      <button onClick={handleTryTrackerClick}>Try tracker</button>
    </div>
  );
};

export default WaterConsumptionTracker;
