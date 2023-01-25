import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { auth, firebaseApp } from './initialize';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

export const database = getFirestore(firebaseApp);

export default async function getCustomers(db: Firestore) {
  const customer = collection(db, 'customer');
  const customerSnapshot = await getDocs(customer);
  const customerList = customerSnapshot.docs.map((doc) => doc.data());
  return customerList;
}

export async function isEmailDuplicate(email: string) {
  const usersList = await fetchSignInMethodsForEmail(auth, email);
  if (usersList.length > 0) {
    return true;
  }
  return false;
}
