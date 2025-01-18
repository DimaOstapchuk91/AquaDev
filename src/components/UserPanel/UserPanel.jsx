import { useTranslation } from "react-i18next";
//=================
import UserBar from "../UserBar/UserBar";

const UserPanel = ({ name, avatar }) => {
  //==================
  const { t } = useTranslation();
  //===========================
  return (
    <div>
      <h2>
        {/* Hello, <span>{name}Nadia!</span> */}
        {t("userPanel")}
        <span>{name}Nadia!</span>
      </h2>
      <UserBar name={name} avatar={avatar} />
    </div>
  );
};

export default UserPanel;
