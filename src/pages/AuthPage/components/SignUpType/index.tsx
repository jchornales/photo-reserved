import { useState } from 'react';
import { Button, Stack } from '@mantine/core';
import SignUpForm from '../../../../components/SignUp';

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
