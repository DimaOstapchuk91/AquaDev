import UserBar from "../UserBar/UserBar";
import { selectIsRefreshing, selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import s from "./UserPanel.module.css";
import { Rings } from "react-loader-spinner";

const UserPanel = () => {
  const { name, email, avatar } = useSelector(selectUser);
  const userName = name ? name : email;
  const userPhoto = avatar
    ? avatar
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIC9LzASG2L2qWXB6-vVFpvbpomrR0rUe-KA&s";

  const loader = useSelector(selectIsRefreshing);

  return (
    <div className={s.container}>
      <h2 className={s.title}>
        Hello,{" "}
        {loader ? (
          <Rings
            visible={true}
            height="60"
            width="60"
            color="#9BE1A0"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <span className={s.span}>{userName} !</span>
        )}
      </h2>
      <UserBar name={userName} avatar={userPhoto} />
    </div>
  );
};

export default UserPanel;
