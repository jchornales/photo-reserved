/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInForm } from '../../config/Types/initialize';
import { userSignInSchema } from '../../config/Validations/initialize';
import { signInUser } from '../../config/Firebase/authentication';
import { ErrorMessage } from '@hookform/error-message';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase/initialize';
import { useNavigate } from 'react-router-dom';
import AuthProviderButtons from '../AuthProviderButtons';
import {
  Text,
  TextInput,
  Input,
  PasswordInput,
  Button,
  Stack,
} from '@mantine/core';
import { useAuthStore } from '../../config/StateManagement/initialize';

export default function SignIn() {
  const navigate = useNavigate();
  const [{ setIsLoggedIn }] = useAuthStore((state) => [state]);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(userSignInSchema),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn();
        navigate('/client');
      }
    });
  }, [watch]);

  const onSubmit: SubmitHandler<SignInForm> = (data) => signInUser(data);

  return (
    <>
      <Text size="lg" weight={500}>
        Sign in to Photo Reserved
      </Text>
      <AuthProviderButtons type={null} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email Address"
            placeholder="Example: johnnybalboabeneventura@gmail.com"
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Input.Error>{message}</Input.Error>}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="password"
            {...register('password')}
          />
          <Button fullWidth type="submit">
            Sign In
          </Button>
        </Stack>
      </form>
    </>
  );
}
