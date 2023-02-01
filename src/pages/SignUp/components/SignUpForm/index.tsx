/* eslint-disable react/jsx-no-bind */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Text, Anchor } from '@mantine/core';
import { userSignUpSchema } from '../../../../config/Validations/initialize';
import { useRegisterTypeStore } from '../../../../config/StateManagement/initialize';
import { useNavigate } from 'react-router-dom';
import processUser from '../../../../config/Firebase/authentication';
import FormStepper from '../FormStepper';
import AuthProviderButtons from '../../../../components/AuthProviderButtons';
import { FormData } from '../../../../config/Types/AuthForm';

type Props = {
  type: string;
};

export default function SignUpForm({ type }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema),
  });
  const { handleSubmit } = form;
  const [{ isRegisterWithEmail, setIsRegisterWithEmail }] =
    useRegisterTypeStore((state) => [state]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    processUser(data, type, null);
  };

  return (
    <>
      {isRegisterWithEmail ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStepper form={form} />
        </form>
      ) : (
        <>
          <Text className="text-3xl text-center mb-10 " weight={500}>
            Sign up to Photo Reserved
          </Text>
          <AuthProviderButtons type={type} />
          <Button fullWidth onClick={() => setIsRegisterWithEmail()}>
            Continue with Email
          </Button>
        </>
      )}
      <Anchor
        component="button"
        type="button"
        color="dimmed"
        onClick={() => navigate('/login')}
        size="xs"
      >
        Already have an account? <span className="text-blue-700">Login</span>
      </Anchor>
    </>
  );
}
