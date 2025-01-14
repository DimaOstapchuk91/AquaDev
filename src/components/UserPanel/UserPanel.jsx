import UserBar from "../UserBar/UserBar";
import { selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import s from "./UserPanel.module.css";

const UserPanel = () => {
  const { name, email, avatar } = useSelector(selectUser);
  const userName = name ? name : email;
  const userPhoto = avatar
    ? avatar
    : "data:image/jpeg;base64,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";

  const truncateName = (userName) => {
    return userName.length > 9 ? `${userName.slice(0, 9)} ...` : userName;
  };
  if (!userName) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>
        Hello, <span className={s.span}>{truncateName(userName)} !</span>
      </h2>
      <UserBar name={userName} avatar={userPhoto} />
    </div>
  );
};

export default UserPanel;
