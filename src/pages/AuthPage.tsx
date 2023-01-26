import { Anchor } from '@mantine/core';
import { Container } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import SignIn from '../components/SignIn';
import SignUpForm from '../components/SignUp';

export default function AuthPage() {
  const [type, toggle] = useToggle(['login', 'register']);

  return (
    <>
      <Container size={600}>
        {type === 'login' ? <SignIn /> : <SignUpForm />}
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => toggle()}
          size="xs"
        >
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Anchor>
      </Container>
    </>
  );
}
