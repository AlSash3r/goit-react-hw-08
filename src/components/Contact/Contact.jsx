import s from "./Contact.module.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };
  return (
    <li className={s.listItem}>
      <div>
        <p className={s.infoItem}>
          <FaUserLarge />
          {name}
        </p>
        <p className={s.infoItem}>
          <FaPhoneAlt />
          {number}
        </p>
      </div>
      <button className={s.deleteBtn} onClick={() => handleDelete()}>
        Delete
      </button>
    </li>
  );
}