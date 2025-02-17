import { NavLink } from "react-router-dom";
import css from "./WelcomeSection.module.css";
import Logo from "../Logo/Logo";

import { useTranslation } from "react-i18next";
import LocalizationDropdown from "../LocalizationDropdown/LocalizationDropdown.jsx";

const WelcomeSection = () => {
  const { t } = useTranslation();

  return (
    <div className={css.welcomeSection}>
      <Logo />

      <div className={css.welcomeContainer}>
        <p className={css.welcomeText}>{t("welcomePage.header")}</p>
        <h1 className={css.welcomeTitle}>{t("welcomePage.name")}</h1>
        <div className={css.welcomeThumb}>
          <NavLink className={css.linkTracker} to="/signup">
            {t("welcomePage.tryTracker")}
          </NavLink>
          <NavLink className={css.linkSignIn} to="/signin">
            {t("welcomePage.signIn")}
          </NavLink>
        </div>
      </div>
      <div className={css.parentTwoVisible}>
        <LocalizationDropdown />
      </div>
    </div>
  );
};

export default WelcomeSection;
