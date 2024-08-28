import WaterConsumptionTracker from '../../components/welcomePage/WaterConsumptionTracker';
import WhyDrinkWater from '../../components/welcomePage/WhyDrinkWater';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};

export default WelcomePage;
