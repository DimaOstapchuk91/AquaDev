import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import styles from './SignUpPage.module.css';
const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 1440);

  useEffect(() => {
     const handleResize = () => {
      setIsVisible(window.innerWidth > 1440);
    };

    // Додаємо слухач події
    window.addEventListener("resize", handleResize);

    // Видаляємо слухач події під час розмонтування
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.containerWapper}>
      <SignUpForm />
       {isVisible && <div className={styles.rightSection}>
        <AdvantagesSection />
      </div>}
    </div>
  );
};
export default SignUpPage;
