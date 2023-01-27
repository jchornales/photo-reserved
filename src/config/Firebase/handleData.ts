import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { auth, firebaseApp } from './initialize';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

export const database = getFirestore(firebaseApp);

export default async function getUsersData() {
  const users = collection(database, 'usersData');
  const usersSnapshot = await getDocs(users);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
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
  const usersList = await getUsersData();
  const isUserExist = usersList.find((user) => user.user_uid === userId);
  if (isUserExist) {
    return true;
  }
  return false;
}
