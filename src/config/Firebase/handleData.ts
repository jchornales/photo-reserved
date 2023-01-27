import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { auth, firebaseApp } from './initialize';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { useUserTypeStore } from '../StateManagement/initialize';

export const database = getFirestore(firebaseApp);

export default async function getUsersData() {
  const users = collection(database, 'usersData');
  const usersSnapshot = await getDocs(users);
  const usersList = usersSnapshot.docs.map((doc): DocumentData => doc.data());
  return usersList;
}

export async function getCurrentUserData() {
  const users = await getUsersData();
  if (auth.currentUser) {
    const currentUserId = auth.currentUser.uid;
    const currentUser = users.find(
      (user: DocumentData) => user.user_uid === currentUserId
    );
    return currentUser;
  }
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
  const isUserExist = usersList.find(
    (user: DocumentData) => user.user_uid === userId
  );
  if (isUserExist) {
    return true;
  }
  return false;
}
