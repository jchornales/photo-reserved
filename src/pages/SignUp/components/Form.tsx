/* eslint-disable react/jsx-no-bind */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Path } from 'react-hook-form';
import { Stepper, Button, Group, Container } from '@mantine/core';
import { FormData } from '../../../config/Types/initialize';
import { userSignUpSchema } from '../../../config/Validations/initialize';
import { useStepperFormStore } from '../../../config/StateManagement/initialize';
import InfoField from './UserInfoFields';
import UserAuth from './UserAuthFields';
import AddressFields from './AddressFields';
import { isEmailDuplicate } from '../../../config/Firebase/fetchData';

export default function Form() {
  const form = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema),
  });
  const { handleSubmit, trigger, getValues, setError } = form;

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
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
