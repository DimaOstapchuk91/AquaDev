import React from "react";
import i18next from "i18next";

//==================
const lngs = {
  en: { nativeName: "EN" },
  ua: { nativeName: "UA" },
};
//===================

const LanguageDropdown = () => {
  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage);
  };

  return (
    <div>
      <label htmlFor="language-select" style={{ marginRight: "8px" }}>
        Language
      </label>
      <select
        id="language-select"
        onChange={changeLanguage}
        defaultValue={i18next.language}
      >
        {Object.keys(lngs).map((lng) => (
          <option key={lng} value={lng}>
            {lngs[lng].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
