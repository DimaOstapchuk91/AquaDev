import { useTranslation } from "react-i18next";
//=================
import UserBar from "../UserBar/UserBar";
import { selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import s from "./UserPanel.module.css";

const UserPanel = () => {
  //==================
  const { t } = useTranslation();
  //===========================
  const { name, email, avatar } = useSelector(selectUser);
  const userName = name ? name : email;
  const userPhoto = avatar
    ? avatar
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIC9LzASG2L2qWXB6-vVFpvbpomrR0rUe-KA&s";

  const truncateName = (userName) => {
    return userName.length > 9 ? `${userName.slice(0, 9)} ...` : userName;
  };
  if (!userName) {
    return <div>Loading...</div>;
  }
  return (
    <div className={s.container}>
      <h2 className={s.title}>
        {/* Hello, <span className={s.span}>{truncateName(userName)} !</span> */}
        {t("userPanel")}{" "}
        <span className={s.span}>{truncateName(userName)} !</span>
      </h2>
      <UserBar name={userName} avatar={userPhoto} />
    </div>
  );
};

export default UserPanel;
