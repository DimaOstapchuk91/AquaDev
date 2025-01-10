import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import styles from './SignUpPage.module.css';
const SignUpPage = () => {
  return (
    <div className={styles.containerWapper}>
      <SignUpForm />
      <div className={styles.rightSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
};
export default SignUpPage;
