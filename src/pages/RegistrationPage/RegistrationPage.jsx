import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Helmet } from "react-helmet-async";
export default function RegistrationPage() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegistrationForm />
    </div>
  );
}