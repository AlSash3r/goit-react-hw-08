import { useSelector } from "react-redux";
import s from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <p className={s.username}>
        Welcome, {user.name} <span style={{ color: "#FFD700", marginLeft: "5px" }}>⭐️</span>
      </p>
      <button
        className={s.logOutBtn}
        type="button"
        onClick={() =>
          dispatch(logOut())
            .unwrap()
            .then(() => {
              toast("See you soon!", { icon: "🤗" });
              navigate("/");
            })
        }
      >
        <LuLogOut /> Logout
      </button>
    </div>
  );
}
