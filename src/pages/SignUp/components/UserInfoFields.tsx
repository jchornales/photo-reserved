/* eslint-disable react/jsx-props-no-spreading */
import { Input, Select, TextInput } from '@mantine/core';
import { UseFormReturn, Path, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormData } from '../../../config/Types/initialize';

type Props = {
  form: UseFormReturn<FormData>;
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

export default function InfoField({ form }: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;
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
      <Controller
        control={control}
        name="user_type"
        render={({ field }) => (
          <Select
            label="User Type"
            placeholder="Select User Type "
            searchable
            clearable
            withAsterisk
            data={['Client', 'Photographer']}
            {...field}
          />
        )}
      />
    </>
  );
}