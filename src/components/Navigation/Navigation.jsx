import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { RiContactsBook2Line } from "react-icons/ri";
import s from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import clsx from "clsx";

const linkBuilder = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.linksContainer}>
      <NavLink to="/" className={linkBuilder}>
        <FaHome /> Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={linkBuilder}>
          <RiContactsBook2Line /> Contacts
        </NavLink>
      )}
    </div>
  );
}