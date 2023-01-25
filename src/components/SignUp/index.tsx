/* eslint-disable react/jsx-no-bind */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Path } from 'react-hook-form';
import { Stepper, Button, Group, Container } from '@mantine/core';
import { userSignUpSchema } from '../../config/Validations/initialize';
import createUser from '../../config/Firebase/authentication';
import {
  useAuthStore,
  useStepperFormStore,
} from '../../config/StateManagement/initialize';
import { isEmailDuplicate } from '../../config/Firebase/handleData';
import UserAuth from './components/UserAuthFields';
import InfoField from './components/UserInfoFields';
import { FormData } from '../../config/Types/initialize';
import AddressFields from './components/AddressFields';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase/initialize';

export default function SignUpForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema),
  });
  const { handleSubmit, trigger, getValues, setError, watch } = form;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/client');
      }
    });
  }, [watch]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    createUser(data);
  };

  const [{ active, target, increaseStep, decreaseStep }] = useStepperFormStore(
    (state) => [state]
  );

  const handleNextStep = async () => {
    const passwordMatch =
      getValues('password') === getValues('passwordConfirmation');
    if (await trigger(target[active] as unknown as Path<FormData>)) {
      const isEmailInvalid = await isEmailDuplicate(getValues('email'));
      if (isEmailInvalid === false) {
        if (!passwordMatch) {
          setError('passwordConfirmation', {
            message: "Password doesn't match",
          });
        }
        if (passwordMatch) {
          increaseStep();
        }
      }
      if (isEmailInvalid === true) {
        setError('email', {
          message: 'Email already exists! Please try again',
        });
      }
    }
  };

  return (
    <Container size={600}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            <UserAuth form={form} />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Personal Information">
            <InfoField form={form} />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <AddressFields form={form} />
          </Stepper.Step>
          <Stepper.Completed>
            Thank you for Registration ... Waiting for redirection
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={decreaseStep}>
            Back
          </Button>
          {active === 2 ? (
            <Button type="submit">Sign up</Button>
          ) : (
            <Button type="button" onClick={handleNextStep}>
              Next step
            </Button>
          )}
        </Group>
      </form>
    </Container>
  );
}
