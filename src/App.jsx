import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import TrackerPage from "./pages/TrackerPage/TrackerPage.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { refreshUser } from "./redux/user/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/user/selectors.js";
// import { setAuthHeader } from './redux/service/configApi.js';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const loadUser = async () => {
      if (isLogged) {
        await dispatch(refreshUser());
      }
    };
    loadUser();
  }, [dispatch, isLogged]);

  return (
    <>
      <SharedLayout>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute component={<HomePage />} redirectTo="/tracker" />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                component={<SignInPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute component={<TrackerPage />} redirectTo="/signin" />
            }
          />
          <Route
            path="*"
            element={
              <RestrictedRoute component={<HomePage />} redirectTo="/tracker" />
            }
          />
        </Routes>
        <Toaster />
      </SharedLayout>
    </>
  );
}

export default App;
