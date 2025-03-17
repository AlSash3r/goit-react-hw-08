import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./ContactForm.module.css";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading"; 

const startValues = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  number: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Phone number is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully added!");
      })
      .catch(() => {
        toast.error("Oops! Something went wrong!");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
    actions.resetForm();
  };

  return (
    <div className={s.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={s.formContainer}>
          <Formik
            initialValues={startValues}
            onSubmit={handleSubmit}
            validationSchema={ContactSchema}
          >
            <Form className={s.form}>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="name">
                  Name
                </label>
                <Field
                  name="name"
                  className={s.input}
                  id="name"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  className={s.errorMessage}
                  name="name"
                  component="p"
                />
              </div>

              <div className={s.formGroup}>
                <label className={s.label} htmlFor="number">
                  Number
                </label>
                <Field
                  name="number"
                  type="tel"
                  className={s.input}
                  id="number"
                  placeholder="Enter phone number"
                  pattern="(\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                  title="Use this format: 380505558822 or 38-050-555-8822 or 38 050 555 8822, min 10 numbers."
                />
                <ErrorMessage
                  className={s.errorMessage}
                  name="number"
                  component="p"
                />
              </div>

              <button className={s.submitButton} type="submit">
                Add Contact
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
