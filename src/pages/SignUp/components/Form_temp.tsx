/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { userSchema } from '../../../config/Validations/initialize';
import AddressFields from './AddressFields';

export default function Formtemp() {
  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      password: '',
      passwordConfirmation: '',
      province: '',
    },
    validate: zodResolver(userSchema),
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="Example: Johnny Balboa"
          {...form.getInputProps('first_name')}
        />
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Example: Dela Cruz"
          {...form.getInputProps('last_name')}
        />
        <TextInput
          label="Email Address"
          placeholder="Example: johnnybalboadelacruz@gmail.com"
          withAsterisk
          mt="md"
          {...form.getInputProps('email')}
        />
        <AddressFields form={form} />
        <TextInput
          label="Password"
          type="password"
          placeholder="**********"
          mt="md"
          {...form.getInputProps('password')}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="**********"
          mt="md"
          {...form.getInputProps('passwordConfirmation')}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
