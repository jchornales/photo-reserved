/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInForm } from '../../config/Types/initialize';
import { userSignInSchema } from '../../config/Validations/initialize';
import { signInUser } from '../../config/Firebase/authentication';
import { ErrorMessage } from '@hookform/error-message';
import { Text, TextInput, Input, PasswordInput, Button } from '@mantine/core';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase/initialize';
import { useNavigate } from 'react-router-dom';
import AuthProviderButtons from '../AuthProviderButtons';

export default function SignIn() {
  const navigate = useNavigate();
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
      <AuthProviderButtons />
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </>
  );
}
