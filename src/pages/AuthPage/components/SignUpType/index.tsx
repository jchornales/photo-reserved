import { useEffect, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import SignUpForm from '../../../../components/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../config/Firebase/initialize';
import { getCurrentUserData } from '../../../../config/Firebase/handleData';

export default function SignUpType() {
  const [type, setType] = useState('');
  return (
    <Stack>
      {!type && (
        <>
          <Button onClick={() => setType('client')}>Client</Button>
          <Button onClick={() => setType('photographer')}>Photographer</Button>
        </>
      )}

      {type && <SignUpForm type={type} />}
    </Stack>
  );
}
