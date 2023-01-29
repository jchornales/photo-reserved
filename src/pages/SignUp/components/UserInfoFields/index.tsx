/* eslint-disable react/jsx-props-no-spreading */
import { Input, TextInput, Stack } from '@mantine/core';
import { UseFormReturn, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormData } from '../../../../config/Types/initialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

type Props = {
  form: UseFormReturn<FormData>;
};

const fields = [
  {
    name: 'first_name',
    label: 'First Name',
    placeholder: 'Example: Johny Balboa',
    icon: faUser,
  },
  {
    name: 'last_name',
    label: 'Last Name',
    placeholder: 'Example: Beneventura',
    icon: faUser,
  },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Example: 09394420100',
    icon: faPhone,
  },
];

export default function InfoField({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Stack>
      {fields.map((field) => (
        <div key={field.name}>
          <TextInput
            withAsterisk
            label={field.label}
            placeholder={field.placeholder}
            icon={<FontAwesomeIcon icon={field.icon} />}
            {...register(`${field.name as Path<FormData>}`)}
          />
          <ErrorMessage
            errors={errors}
            name={field.name as Path<FormData>}
            render={({ message }) => <Input.Error>{message}</Input.Error>}
          />
        </div>
      ))}
    </Stack>
  );
}
