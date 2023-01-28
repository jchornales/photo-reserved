import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/Firebase/initialize';
import { useAuthStore } from '../../config/StateManagement/initialize';
import { Button, Container } from '@mantine/core';

export default function NavigationBar() {
  const [{ isLoggedIn }] = useAuthStore((state) => [state]);
  const navigate = useNavigate();

  return (
    <nav className="min-w-screen h-[100px]">
      <Link to="/login">Login</Link>
      {isLoggedIn && (
        <Button
          onClick={() => {
            signOut(auth)
              .then(() => {
                navigate('/login');
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Logout
        </Button>
      )}
    </nav>
  );
}
