/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import { Input, PasswordInput, TextInput, Stack } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormData } from '../../../../config/Types/AuthForm';

type Props = {
  form: UseFormReturn<FormData>;
};

const fields = [
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Example: johnnybalboabeneventura@gmail.com',
    icon: faAt,
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    icon: faKey,
    description:
      'Password must include at least one letter, number and special character',
  },
  {
    name: 'passwordConfirmation',
    label: 'Confirm Password',
    placeholder: 'Confirm Passsword',
    icon: faKey,
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
    <Stack>
      {fields.map((field) => {
        return (
          <div key={field.name}>
            {field.name === 'email' ? (
              <TextInput
                withAsterisk
                label={field.label}
                placeholder={field.placeholder}
                icon={<FontAwesomeIcon icon={field.icon} />}
                {...register(`${field.name as Path<FormData>}`)}
              />
            ) : (
              <PasswordInput
                withAsterisk
                label={field.label}
                placeholder={field.placeholder}
                icon={<FontAwesomeIcon icon={field.icon} />}
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
    </Stack>
  );
}
