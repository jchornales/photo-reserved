import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { Button, Divider, Group } from '@mantine/core';
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from '../../config/Firebase/authentication';

type Props = {
  type: string | null;
};
export default function AuthProviderButtons({ type }: Props) {
  return (
    <>
      <Group grow mb="md" mt="md">
        <Button
          leftIcon={<FontAwesomeIcon icon={faGoogle} />}
          variant="default"
          onClick={() => signInWithGoogle(type)}
        >
          Google
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faGithub} />}
          variant="default"
          onClick={() => signInWithGithub(type)}
        >
          Github
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faFacebook} />}
          variant="default"
          onClick={() => signInWithFacebook(type)}
        >
          Facebook
        </Button>
      </Group>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
    </>
  );
}
