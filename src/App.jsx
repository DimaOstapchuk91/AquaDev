import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import TrackerPage from './pages/TrackerPage/TrackerPage.jsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx';
import { Toaster } from 'react-hot-toast';
import useAccessRefresh from './hooks/accessRefresh.js';
import GoogleCallbacks from './pages/GoogleCallbacks/GoogleCallbacks.jsx';

function App() {
  useAccessRefresh();
  return (
    <>
      <SharedLayout>
        <Routes>
          <Route path='/google-callback' element={<GoogleCallbacks />} />
          <Route
            path='/'
            element={
              <RestrictedRoute component={<HomePage />} redirectTo='/tracker' />
            }
          />
          <Route
            path='/signup'
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo='/tracker'
              />
            }
          />
          <Route
            path='/signin'
            element={
              <RestrictedRoute
                component={<SignInPage />}
                redirectTo='/tracker'
              />
            }
          />

          <Route
            path='/tracker'
            element={
              <PrivateRoute component={<TrackerPage />} redirectTo='/' />
            }
          />
          <Route
            path='*'
            element={
              <RestrictedRoute component={<HomePage />} redirectTo='/tracker' />
            }
          />
        </Routes>
        <Toaster />
      </SharedLayout>
    </>
  );
}

export default App;
