import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { Button, Divider, Group, Text } from '@mantine/core';
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from '../../config/Firebase/authentication';

export default function AuthProviderButtons() {
  return (
    <>
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
    </>
  );
}
