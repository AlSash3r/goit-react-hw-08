import { Helmet } from "react-helmet-async";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={s.headerContainer}>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <h1 className={s.header}>🌺 Hello, welcome to our phonebook page 🌺</h1>
    </div>
  );
}