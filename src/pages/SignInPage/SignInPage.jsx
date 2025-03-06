import { useState, useEffect } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import styles from './SignInPage.module.css';
const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1440);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={'container'}>
      <div className={styles.containerWapper}>
        <SignInForm />
        {isVisible && (
          <div className={styles.rightSection}>
            <AdvantagesSection />
          </div>
        )}
      </div>
    </div>
  );
};
export default SignInPage;
