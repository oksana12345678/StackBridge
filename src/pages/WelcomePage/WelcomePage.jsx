import WaterConsumptionTracker from '../../components/welcomePage/WaterConsumptionTracker';
import WhyDrinkWater from '../../components/welcomePage/WhyDrinkWater';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};

export default WelcomePage;
