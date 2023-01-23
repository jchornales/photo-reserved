/* eslint-disable react/jsx-no-bind */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stepper, Button, Group, Container } from '@mantine/core';
import { FormData } from '../../../config/Types/initialize';
import { userSignUpSchema } from '../../../config/Validations/initialize';
import InfoField from './InfoField';
import UserAuth from './UserAuth';
import AddressFields from './AddressFields';

export default function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema),
  });
  const [active, setActive] = useState(0);

  function nextStep() {
    setActive((current) => (current < 3 ? current + 1 : current));
  }
  function prevStep() {
    setActive((current) => (current > 0 ? current - 1 : current));
  }

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <Container size={600}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            <UserAuth errors={errors} register={register} />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Personal Information">
            <InfoField errors={errors} register={register} />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <AddressFields control={control} register={register} />
            <button type="submit">Submit</button>
          </Stepper.Step>
          <Stepper.Completed>Done</Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="button" onClick={nextStep}>
            Next step
          </Button>
        </Group>
      </form>
    </Container>
  );
}
