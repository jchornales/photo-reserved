/* eslint-disable react/jsx-no-bind */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Text } from '@mantine/core';
import { userSignUpSchema } from '../../config/Validations/initialize';
import { FormData } from '../../config/Types/initialize';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase/initialize';
import AuthProviderButtons from '../AuthProviderButtons';
import FormStepper from './components/FormStepper';
import { useRegisterTypeStore } from '../../config/StateManagement/initialize';
import processUser from '../../config/Firebase/authentication';

type Props = {
  type: string;
};

export default function SignUpForm({ type }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema),
  });
  const { handleSubmit, watch } = form;
  const [{ isRegisterWithEmail, setIsRegisterWithEmail }] =
    useRegisterTypeStore((state) => [state]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    processUser(data, type, null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/${type}`);
      }
    });
  }, [watch]);

  return (
    <>
      {isRegisterWithEmail ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStepper form={form} />
        </form>
      ) : (
        <>
          <Text size="lg" weight={500}>
            Sign in to Photo Reserved
          </Text>
          <AuthProviderButtons type={type} />
          <Button fullWidth onClick={() => setIsRegisterWithEmail()}>
            Continue with Email
          </Button>
        </>
      )}
    </>
  );
}
