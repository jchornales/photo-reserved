import { onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { auth } from '../config/Firebase/initialize';

export default function Photographer() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      // eslint-disable-next-line no-console
      return <p>welcome photographer ,{uid}</p>;
    } else {
      // User is signed out
      // ...
      return redirect('/');
    }
  });
  return <>Photographer</>;
}
