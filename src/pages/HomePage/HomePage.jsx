import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <div>
      <div className={'container'}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default HomePage;
