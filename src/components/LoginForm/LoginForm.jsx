import { logIn } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { IoIosLock } from "react-icons/io";
import { SiMaildotru } from "react-icons/si";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password too short!")
    .max(30, "Password too long!")
    .required("Password is Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: location.state?.email ?? "",
    password: location.state?.password ?? "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/contacts", { replace: true });
      })
      .catch(() => {
        toast.error("Login failed. Please try again.");
      });
    actions.resetForm();
  };

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <p className={s.formTitle}>Login in to account</p>
            <label htmlFor="email" className={s.formInputLabel}>
              Email
            </label>
            <div className={s.iconInputWrapper}>
              <span className={s.inputIcon}>
                <SiMaildotru />
              </span>
              <Field
                className={s.input}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <ErrorMessage className={s.error} name="email" component="span" />
            </div>

            {}
            <label htmlFor="password" className={s.formInputLabel}>
              Password
            </label>
            <div className={s.iconInputWrapper}>
              <span className={s.inputIcon}>
                <IoIosLock />
              </span>
              <Field
                className={s.input}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                className={s.error}
                name="password"
                component="span"
              />
            </div>

            {}
            <button type="submit" className={s.btn}>
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
