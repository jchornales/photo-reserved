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
  if (email) {
    const usersList = await fetchSignInMethodsForEmail(auth, email);
    if (usersList.length > 0) {
      return true;
    }
    return false;
  }
}

export async function isUserDataDuplicate(userId: string) {
  const users = collection(database, 'customers');
  const usersSnapshot = await getDocs(users);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  const isUserExist = usersList.find((user) => user.user_uid === userId);
  if (isUserExist) {
    return true;
  }
  return false;
}
