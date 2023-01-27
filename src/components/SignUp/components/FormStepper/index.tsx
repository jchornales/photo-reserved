import { isEmailDuplicate } from '../../../../config/Firebase/handleData';
import AddressFields from '../AddressFields';
import UserAuth from '../UserAuthFields';
import InfoField from '../UserInfoFields';
import { Stepper, Button, Group } from '@mantine/core';
import { UseFormReturn, Path } from 'react-hook-form';
import { FormData } from '../../../../config/Types/initialize';
import {
  useRegisterTypeStore,
  useStepperFormStore,
} from '../../../../config/StateManagement/initialize';

type Props = {
  form: UseFormReturn<FormData>;
};

export default function FormStepper({ form }: Props) {
  const [{ active, target, increaseStep, decreaseStep }] = useStepperFormStore(
    (state) => [state]
  );
  const [{ setIsRegisterWithEmail }] = useRegisterTypeStore((state) => [state]);
  const { getValues, trigger, setError } = form;

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
    <>
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
        {active === 0 ? (
          <Button variant="default" onClick={() => setIsRegisterWithEmail()}>
            Back
          </Button>
        ) : (
          <Button variant="default" onClick={decreaseStep}>
            Back
          </Button>
        )}
        {active === 2 ? (
          <Button type="submit">Sign up</Button>
        ) : (
          <Button type="button" onClick={handleNextStep}>
            Next step
          </Button>
        )}
      </Group>
    </>
  );
}
