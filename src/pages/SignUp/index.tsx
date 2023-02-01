import {
  Group,
  UnstyledButton,
  Text,
  Paper,
  Container,
  Stack,
  Button,
  Divider,
} from '@mantine/core';
import { faImages, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignUpForm from './components/SignUpForm';
import { PaperProps } from '@mantine/core/lib/Paper/Paper';
import { useNavigate } from 'react-router-dom';
import { useUserTypeStore } from '../../config/StateManagement/initialize';

export default function SignUp(props: PaperProps) {
  const [{ userType, setUserType }] = useUserTypeStore((state) => [state]);
  const navigate = useNavigate();

  const options = [
    {
      label: "I'm a Client, hiring for an event",
      icon: faImages,
      value: 'client',
    },
    {
      label: "I'm a Photographer, looking for work",
      icon: faCameraRetro,
      value: 'photographer',
    },
  ];
  return (
    <Container size={700}>
      <Paper className="py-20 px-20" radius="md" p="xl" withBorder {...props}>
        {userType === '' ? (
          <>
            <Text className="text-3xl text-center mb-10 ">
              Join as a client or photographer
            </Text>
            <Group grow mb="md" mt="md">
              {options.map((option) => (
                <UnstyledButton
                  className="py-10 px-5 border-2 border-solid border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-2xl text-center"
                  onClick={() => setUserType(option.value)}
                >
                  <Stack align="center">
                    <FontAwesomeIcon icon={option.icon} size="lg" />
                    <Text fz="xl" fw={500}>
                      {option.label}
                    </Text>
                  </Stack>
                </UnstyledButton>
              ))}
            </Group>

            <Stack>
              <Divider
                label="Already have an account?"
                labelPosition="center"
                my="lg"
              />
              <Button onClick={() => navigate('/login')}>Sign In</Button>
            </Stack>
          </>
        ) : (
          <SignUpForm type={userType} />
        )}
      </Paper>
    </Container>
  );
}
