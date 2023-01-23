/* eslint-disable react/jsx-props-no-spreading */
import { Input, TextInput } from '@mantine/core';
import { UseFormRegister, Path, FieldErrorsImpl } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormData } from '../../../config/Types/initialize';

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrorsImpl<FormData>;
};

const SignUpFields = [
  {
    name: 'first_name',
    label: 'First Name',
    placeholder: 'Example: Johny Balboa',
  },
  {
    name: 'last_name',
    label: 'Last Name',
    placeholder: 'Example: Beneventura',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Example: 09394420100',
  },
];

export default function InfoField({ register, errors }: Props) {
  return (
    <>
      {SignUpFields.map((field) => (
        <div key={field.name}>
          <TextInput
            withAsterisk
            label={field.label}
            placeholder={field.placeholder}
            {...register(`${field.name as Path<FormData>}`)}
          />
          <ErrorMessage
            errors={errors}
            name={field.name as Path<FormData>}
            render={({ message }) => <Input.Error>{message}</Input.Error>}
          />
        </div>
      ))}
    </>
  );
}
