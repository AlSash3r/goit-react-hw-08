import { NavLink } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { MdCreate } from "react-icons/md";
import clsx from "clsx";
import s from "./AuthNav.module.css";

export default function AuthNav() {
  const getClassActiveLink = ({ isActive }) =>
    clsx(s.link, isActive && s.active); 

  return (
    <div className={s.linksContainer}>
      <NavLink to="/register" className={getClassActiveLink}>
        <MdCreate /> Register
      </NavLink>
      <NavLink to="/login" className={getClassActiveLink}>
        <LuLogIn /> Log In
      </NavLink>
    </div>
  );
}
