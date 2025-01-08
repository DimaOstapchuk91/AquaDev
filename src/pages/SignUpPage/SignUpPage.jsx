import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css";
const SignUpPage = () => {
  return (
    <div className={styles.containerWapper}>
      <div className={styles.leftSection}>
        <SignUpForm />
      </div>
      <div className={styles.rightSection}>
        <img
          src="https://via.placeholder.com/400x600"
          alt="Person drinking water"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.customerInfo}>
            <span className={styles.customers}>Our happy customers</span>
            <div className={styles.avatarGroup}>
              {/* Додайте аватари тут */}
            </div>
          </div>
          <button className={styles.infoButton}>Habit drive</button>
          <button className={styles.infoButton}>View statistics</button>
          <button className={styles.infoButton}>Personal rate setting</button>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
