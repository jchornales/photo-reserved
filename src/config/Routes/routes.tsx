import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../../App';
import AuthPage from '../../pages/AuthPage';
import CustomerPage from '../../pages/Customer';
import Home from '../../pages/Home';
import Photographer from '../../pages/Photographer';
import { getCurrentUserData } from '../Firebase/handleData';
import { auth } from '../Firebase/initialize';
import { useAuthStore, useUserTypeStore } from '../StateManagement/initialize';

export default function AppRouter() {
  const [{ isLoggedIn, setIsLoggedIn }] = useAuthStore((state) => [state]);
  const [{ userType, setUserType }] = useUserTypeStore((state) => [state]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        try {
          getCurrentUserData().then((res) => {
            if (res) {
              setUserType(res.user_type);
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth, isLoggedIn]);
  return (
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate replace to={`/${userType}`} /> : <AuthPage />
          }
        />

        <Route
          path="/client"
          element={
            isLoggedIn ? (
              userType === 'client' ? (
                <CustomerPage />
              ) : (
                <Navigate replace to={`/${userType}`} />
              )
            ) : (
              <Navigate replace to={`/login`} />
            )
          }
        />
        <Route
          path="/photographer"
          element={
            isLoggedIn ? (
              userType === 'photographer' ? (
                <Photographer />
              ) : (
                <Navigate replace to={`/${userType}`} />
              )
            ) : (
              <Navigate replace to={`/login`} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
