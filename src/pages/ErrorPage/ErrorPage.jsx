import { Helmet } from "react-helmet-async";

export default function ErrorPage() {
  return (
    <div>
      <Helmet>
        <title>Somewhere</title>
      </Helmet>
      <h2>Page not found!</h2>
      <p>Please return to the home page</p>
    </div>
  );
}