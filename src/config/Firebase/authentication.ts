/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from './initialize';
import { database } from './handleData';
import { FormData, SignInForm } from '../Types/initialize';

export default function createUser(data: FormData) {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      try {
        // const docRef = await addDoc(collection(database, 'customers'), {
        //   user_uid: user.uid,
        //   displayName: `${data.first_name} ${data.last_name}`,
        //   phone: data.phone,
        //   province: data.address,
        //   city: data.city,
        //   barangay: data.barangay,
        //   address: data.address,
        //   user_type: data.user_type,
        // });
        // console.log('Document written with ID: ', docRef.id);
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
    })
    .catch((error) => {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      console.log(`${errorCode} : ${errorMessage}`);
    });
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      try {
        const docRef = await addDoc(collection(database, 'customers'), {
          user_uid: user.uid,
          displayName: user.displayName,
          phone: '',
          province: '',
          city: '',
          barangay: '',
          address: '',
          user_type: '',
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function signInWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      try {
        const docRef = await addDoc(collection(database, 'customers'), {
          user_uid: user.uid,
          displayName: user.displayName,
          phone: '',
          province: '',
          city: '',
          barangay: '',
          address: '',
          user_type: '',
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
}

export function signInWithFacebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      try {
        const docRef = await addDoc(collection(database, 'customers'), {
          user_uid: user.uid,
          displayName: user.displayName,
          phone: '',
          province: '',
          city: '',
          barangay: '',
          address: '',
          user_type: '',
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
}
