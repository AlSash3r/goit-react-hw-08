import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import Loading from "../Loading/Loading"; // Импорт нового компонента
import { useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/filters/selectors";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  return (
    <div>
      {isLoading && !error && <Loading />} {}
      {filteredContacts.length > 0 && (
        <ul className={s.container}>
          {filteredContacts.map(({ id, name, number }) => {
            return <Contact key={id} id={id} name={name} number={number} />;
          })}
        </ul>
      )}
      {error && <h2>error</h2>}
    </div>
  );
}
