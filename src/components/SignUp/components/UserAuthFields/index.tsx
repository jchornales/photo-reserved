/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { ErrorMessage } from '@hookform/error-message';
import {
  Button,
  Divider,
  Group,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types';
import { FormData } from '../../../../config/Types/initialize';
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from '../../../../config/Firebase/authentication';

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
      <Text size="md" weight={500}>
        Sign up with
      </Text>
      <Group grow mb="md" mt="md">
        <Button
          leftIcon={<FontAwesomeIcon icon={faGoogle} />}
          variant="default"
          onClick={signInWithGoogle}
        >
          Google
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faGithub} />}
          variant="default"
          onClick={signInWithGithub}
        >
          Github
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faFacebook} />}
          variant="default"
          onClick={signInWithFacebook}
        >
          Facebook
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

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
