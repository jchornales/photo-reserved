import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/Firebase/initialize';
import {
  useAuthStore,
  useUserTypeStore,
} from '../../config/StateManagement/initialize';
import { Button } from '@mantine/core';

function LoggedInComponents() {
  const [{ userType, setUserType }] = useUserTypeStore((state) => [state]);
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          signOut(auth)
            .then(() => {
              setUserType('');
              navigate('/');
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Logout
      </Button>
      <Link to={`/${userType}`}>{userType}</Link>
    </>
  );
}

export default function NavigationBar() {
  const [{ isLoggedIn }] = useAuthStore((state) => [state]);

  return (
    <nav className="min-w-screen h-[100px] fixed top-0">
      {isLoggedIn ? <LoggedInComponents /> : <Link to="/login">Login</Link>}
    </nav>
  );
}
