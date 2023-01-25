import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/Firebase/initialize';

export default function CustomerPage() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      return <p>welcome client ,{uid}</p>;
    } else {
      // User is signed out
      return <Navigate to="/login" />;
    }
  });
  return <div>Customer</div>;
}
