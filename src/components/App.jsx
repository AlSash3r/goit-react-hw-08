import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() => {
  return import("../pages/RegistrationPage/RegistrationPage");
});
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <h2>Refreshing the user...</h2>
  ) : (
    <Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute route={<RegistrationPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute route={<LoginPage />} />}
          />
          <Route path="/contacts" element={<PrivateRoute />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;