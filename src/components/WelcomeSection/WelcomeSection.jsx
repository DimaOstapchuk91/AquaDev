import { NavLink } from "react-router-dom";
import css from "./WelcomeSection.module.css";
import Logo from "../Logo/Logo";
import i18next from "i18next";

//====================

import { useTranslation } from "react-i18next";
import LocalizationDropdown from "../LocalizationDropdown/LocalizationDropdown";
//==================
// const lngs = {
//   en: { nativeName: "English" },
//   es: { nativeName: "Español" },
//   ua: { nativeName: "Українська" },
// };
//===================

const WelcomeSection = () => {
  //=====================
  const { t } = useTranslation();
  //====================
  return (
    <div className={css.welcomeSection}>
      <Logo />
      {/* //===================== */}
      <div>
        {/* <div>
          {Object.keys(lngs).map((lng) => (
            <button
              className={css.linkSignIn}
              type="submit"
              key={lng}
              onClick={() => i18next.changeLanguage(lng)}
              disabled={i18next.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div> */}
      </div>
      {/* //================= */}
      <div className={css.welcomeContainer}>
        {/* <p className={css.welcomeText}>Record daily water intake and track</p> */}
        {/* //============== */}
        <p className={css.welcomeText}>{t("welcomePage.header")}</p>
        {/* //================= */}
        <h1 className={css.welcomeTitle}>{t("welcomePage.name")}</h1>
        <div className={css.welcomeThumb}>
          <NavLink className={css.linkTracker} to="/signup">
            {/* Try tracker */}
            {t("welcomePage.tryTracker")}
          </NavLink>
          <NavLink className={css.linkSignIn} to="/signin">
            {/* Sign in */}
            {t("welcomePage.signIn")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
