import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Firebase/initialize';

export default function CustomerPage() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      // eslint-disable-next-line no-console
      console.log('welcome user ', uid);
    } else {
      // User is signed out
      // ...
    }
  });
  return <div>Customer</div>;
}
