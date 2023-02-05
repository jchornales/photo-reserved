/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from './initialize';
import { database, isUserDataDuplicate } from './handleData';
import { FormData, SignInForm } from '../Types/AuthForm';

async function storeData(
  data: FormData | null,
  type: string | null,
  userCredential: UserCredential
) {
  const { user } = userCredential;
  const isUserExist = await isUserDataDuplicate(user.uid);
  try {
    if (type !== null && isUserExist === false) {
      const docRef = await addDoc(collection(database, 'usersData'), {
        user_type: type,
        barangay: data?.barangay || '',
        city: data?.city || '',
        province: data?.address || '',
        address: data?.address || '',
        phone: data?.phone || '',
        displayName:
          user.displayName || `${data?.first_name} ${data?.last_name}`,
        user_uid: user.uid,
      });
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

export default function processUser(
  data: FormData | null,
  type: string | null,
  provider: string | null
) {
  if (data && provider == null) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: UserCredential) =>
        storeData(data, type, userCredential)
      )
      .catch((error) => {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        console.log(`${errorCode} : ${errorMessage}`);
      });
  }
  if (provider) {
    let emailProvider = new GoogleAuthProvider();
    switch (provider) {
      case 'google':
        emailProvider = new GoogleAuthProvider();
        emailProvider.addScope(
          'https://www.googleapis.com/auth/userinfo.profile'
        );
        break;
      case 'facebook':
        emailProvider = new FacebookAuthProvider();
        break;
      case 'github':
        emailProvider = new GithubAuthProvider();
    }

    signInWithPopup(auth, emailProvider)
      .then(async (userCredential) => {
        storeData(null, type, userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }
}

export function signInUser(data: SignInForm) {
  signInWithEmailAndPassword(auth, data.email, data.password).catch((error) => {
    const errorCode = error?.code;
    const errorMessage = error?.message;
    console.log(`${errorCode} : ${errorMessage}`);
  });
}
