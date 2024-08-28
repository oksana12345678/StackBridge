import WaterConsumptionTracker from '../../components/welcomePage/WaterConsumptionTracker';
import WhyDrinkWater from '../../components/welcomePage/WhyDrinkWater';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.trackerSection}>
          <WaterConsumptionTracker />
        </div>
        <div className={styles.whyDrinkSection}>
          <WhyDrinkWater />
        </div>
      </div>
      <img className={styles.backgroundElement} src="path_to_your_background_image" alt="Background" />
    </div>
  );
};

export default WelcomePage;
