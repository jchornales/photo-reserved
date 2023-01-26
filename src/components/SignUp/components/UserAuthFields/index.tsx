/* eslint-disable react/jsx-props-no-spreading */

import { ErrorMessage } from '@hookform/error-message';
import { Input, PasswordInput, TextInput, Text } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types';
import { FormData } from '../../../../config/Types/initialize';
import AuthProviderButtons from '../../../AuthProviderButtons';

type Props = {
  form: UseFormReturn<FormData>;
};

const SignUpFields = [
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Example: johnnybalboabeneventura@gmail.com',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    description:
      'Password must include at least one letter, number and special character',
  },
  {
    name: 'passwordConfirmation',
    label: 'Confirm Password',
    placeholder: 'Confirm Passsword',
    description:
      'Password must include at least one letter, number and special character',
  },
];

export default function UserAuth({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <>
      {SignUpFields.map((field) => {
        return (
          <div key={field.name}>
            {field.name === 'email' ? (
              <TextInput
                withAsterisk
                label={field.label}
                placeholder={field.placeholder}
                {...register(`${field.name as Path<FormData>}`)}
              />
            ) : (
              <PasswordInput
                withAsterisk
                label={field.label}
                placeholder={field.placeholder}
                description={field.description}
                {...register(`${field.name as Path<FormData>}`)}
              />
            )}
            <ErrorMessage
              errors={errors}
              name={field.name as Path<FormData>}
              render={({ message }) => <Input.Error>{message}</Input.Error>}
            />
          </div>
        );
      })}
    </>
  );
}
