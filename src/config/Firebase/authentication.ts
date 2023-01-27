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
import { FormData, SignInForm } from '../Types/initialize';

async function storeData(
  data: FormData | null,
  type: string | null,
  userCredential: UserCredential
) {
  const { user } = userCredential;
  try {
    if (type !== null) {
      const docRef = await addDoc(collection(database, 'usersData'), {
        user_uid: user.uid,
        displayName:
          user.displayName || `${data?.first_name} ${data?.last_name}`,
        phone: data?.phone || '',
        province: data?.address || '',
        city: data?.city || '',
        barangay: data?.barangay || '',
        address: data?.address || '',
        user_type: type,
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

    if (provider === 'google') {
      emailProvider = new GoogleAuthProvider();
      emailProvider.addScope(
        'https://www.googleapis.com/auth/userinfo.profile'
      );
    }
    if (provider === 'facebook') {
      emailProvider = new FacebookAuthProvider();
    }
    if (provider === 'github') {
      emailProvider = new GithubAuthProvider();
    }

    signInWithPopup(auth, emailProvider)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const isUserExist = await isUserDataDuplicate(user.uid);

        if (isUserExist === false) {
          storeData(null, 'client', userCredential);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
}

export function signInUser(data: SignInForm) {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // ...
    })
    .catch((error) => {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(`${errorCode} : ${errorMessage}`);
    });
}
