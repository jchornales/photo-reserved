import { Button, UnstyledButton } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/Firebase/initialize';
import { useAuthStore } from './config/StateManagement/initialize';
function App() {
  const [{ isLoggedIn }] = useAuthStore((state) => [state]);
  const navigate = useNavigate();

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
