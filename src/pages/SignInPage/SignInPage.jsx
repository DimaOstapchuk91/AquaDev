import SignInForm from "../../components/SignInForm/SignInForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import styles from "./SignInPage.module.css";
const SignInPage = () => {
  return (
    <div className={styles.containerWapper}>
      <SignInForm />
      <div className={styles.rightSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
};
export default SignInPage;
