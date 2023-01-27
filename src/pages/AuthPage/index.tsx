import { Anchor, Paper, PaperProps, Container, Stack } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import SignIn from '../../components/SignIn';
import SignUpType from './components/SignUpType';

export default function AuthPage(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);

  return (
    <>
      <Container size={600}>
        <Paper radius="md" p="xl" withBorder {...props}>
          {type === 'login' ? <SignIn /> : <SignUpType />}
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
        </Paper>
      </Container>
    </>
  );
}
