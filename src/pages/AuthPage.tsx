import React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function AuthPage() {
  return (
    <>
      <SignUp />
      <SignIn />
    </>
  );
}
