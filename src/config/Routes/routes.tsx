import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../../App';
import NavigationBar from '../../components/NavigationBar';

import CustomerPage from '../../pages/Customer';
import Home from '../../pages/Home';
import Photographer from '../../pages/Photographer';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import { useAuthStore, useUserTypeStore } from '../StateManagement/initialize';

export default function AppRouter() {
  const [{ isLoggedIn }] = useAuthStore((state) => [state]);
  const [{ userType }] = useUserTypeStore((state) => [state]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate replace to={`/client`} /> : <SignIn />
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate replace to={`/${userType}`} /> : <SignUp />
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
