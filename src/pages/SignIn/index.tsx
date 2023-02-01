/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userSignInSchema } from '../../config/Validations/initialize';
import { signInUser } from '../../config/Firebase/authentication';
import { ErrorMessage } from '@hookform/error-message';
import {
  Text,
  TextInput,
  Input,
  PasswordInput,
  Button,
  Stack,
  Container,
  Paper,
  Divider,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { PaperProps } from '@mantine/core/lib/Paper/Paper';
import { useNavigate } from 'react-router-dom';
import AuthProviderButtons from '../../components/AuthProviderButtons';
import { SignInForm } from '../../config/Types/AuthForm';

export default function SignIn(props: PaperProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(userSignInSchema),
  });
  const onSubmit: SubmitHandler<SignInForm> = (data) => signInUser(data);
  const navigate = useNavigate();
  return (
    <Container size={700}>
      <Paper className="py-20 px-20" radius="md" p="xl" withBorder {...props}>
        <Text className="text-3xl text-center mb-10 " weight={500}>
          Sign in to Photo Reserved
        </Text>
        <AuthProviderButtons type={null} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Email Address"
              placeholder="Example: johnnybalboabeneventura@gmail.com"
              icon={<FontAwesomeIcon icon={faAt} />}
              {...register('email')}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <Input.Error>{message}</Input.Error>}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              icon={<FontAwesomeIcon icon={faKey} />}
              {...register('password')}
            />
            <Button fullWidth type="submit">
              Sign In
            </Button>
          </Stack>
        </form>
        <Stack>
          <Divider
            label="Don't have a Photo Reserved account?"
            labelPosition="center"
            my="lg"
          />
          <Button variant="default" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
