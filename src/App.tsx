import { Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/Firebase/initialize';
import { useAuthStore } from './config/StateManagement/initialize';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Link to="/login">Login</Link>

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
    </div>
  );
}

export default App;
