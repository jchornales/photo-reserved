import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { Button, Divider, Group } from '@mantine/core';
import processUser from '../../config/Firebase/authentication';

type Props = {
  type: string | null;
};

const buttons = [
  { icon: faGoogle, provider: 'google', label: 'Google' },
  { icon: faGithub, provider: 'github', label: 'Github' },
  { icon: faFacebook, provider: 'facebook', label: 'Facebook' },
];

export default function AuthProviderButtons({ type }: Props) {
  return (
    <>
      <Group grow mb="md" mt="md">
        {buttons.map((button) => (
          <Button
            key={button.provider}
            leftIcon={<FontAwesomeIcon icon={button.icon} />}
            variant="default"
            onClick={() => processUser(null, type, button.provider)}
          >
            {button.label}
          </Button>
        ))}
      </Group>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
    </>
  );
}
