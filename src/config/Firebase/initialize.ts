// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBizGP1s395k9u5S8HIR9ip-U1ZR4q9ndw',
  authDomain: 'photo-reserved-7190f.firebaseapp.com',
  projectId: 'photo-reserved-7190f',
  storageBucket: 'photo-reserved-7190f.appspot.com',
  messagingSenderId: '260598273460',
  appId: '1:260598273460:web:8562f3c571834353680ee1',
  measurementId: 'G-1RNEY6Y5HG',
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
