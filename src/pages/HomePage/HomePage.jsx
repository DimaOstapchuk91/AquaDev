import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={s.homePageWrap}>
      <div className={'container'}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default HomePage;
