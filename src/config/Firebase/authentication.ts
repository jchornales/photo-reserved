/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from './initialize';
import { database } from './fetchData';
import { FormData, SignInForm } from '../Types/initialize';

export default function createUser(data: FormData) {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      console.log(user);
      try {
        const docRef = await addDoc(collection(database, 'customers'), {
          user_uid: user.uid,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          address: data.address,
        });
        console.log('Document written with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    })
    .catch((error) => {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(`${errorCode} : ${errorMessage}`);
    });
}

export function signInUser(data: SignInForm) {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // ...
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(`${errorCode} : ${errorMessage}`);
    });
}
