import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { getCurrentUserData } from './config/Firebase/handleData';
import { auth } from './config/Firebase/initialize';
import {
  useAuthStore,
  useUserTypeStore,
} from './config/StateManagement/initialize';
import { BaseLayout } from './config/Types/Global';

function App({ children }: BaseLayout) {
  const [{ isLoggedIn, setIsLoggedIn }] = useAuthStore((state) => [state]);
  const [{ userType, setUserType }] = useUserTypeStore((state) => [state]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
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
        setUserType('');
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn, auth.currentUser]);

  return <div className="App py-[100px]">{children}</div>;
}

export default App;
