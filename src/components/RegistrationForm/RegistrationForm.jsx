import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa6';
import { SiMaildotru } from 'react-icons/si';
import { IoIosLock } from 'react-icons/io';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Field required'),
  email: Yup.string().email('Invalid email address').trim().required('Field required'),
  password: Yup.string()
    .min(8, 'Password is too short!')
    .max(30, 'Password is too long!')
    .trim()
    .required('Field required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success('Registered successfully');
        navigate('/login', { replace: true, state: { ...values } });
      })
      .catch(() => {
        toast.error('User already exists');
      });
  };

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={RegistrationSchema}
        >
          <Form className={s.form}>
            <p className={s.formTitle}>Create Account</p>
            <div className={s.formFields}>
              <label className={s.formInputLabel} htmlFor="name">
                Username
              </label>
              <div className={s.iconPosition}>
                <Field
                  className={s.input}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                />
                <span className={s.inputIcon}>
                  <FaUser />
                </span>
              </div>
              <ErrorMessage className={s.error} name="name" component="span" />
            </div>

            <div className={s.formFields}>
              <label className={s.formInputLabel} htmlFor="email">
                Email
              </label>
              <div className={s.iconPosition}>
                <Field
                  className={s.input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <span className={s.inputIcon}>
                  <SiMaildotru />
                </span>
              </div>
              <ErrorMessage className={s.error} name="email" component="span" />
            </div>

            <div className={s.formFields}>
              <label className={s.formInputLabel} htmlFor="password">
                Password
              </label>
              <div className={s.iconPosition}>
                <Field
                  className={s.input}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <span className={s.inputIcon}>
                  <IconContext.Provider
                    value={{
                      size: '1.5em',
                    }}
                  >
                    <IoIosLock />
                  </IconContext.Provider>
                </span>
              </div>
              <ErrorMessage
                className={s.error}
                name="password"
                component="span"
              />
            </div>

            <button className={s.btn} type="submit">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
