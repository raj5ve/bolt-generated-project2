import { useState } from 'react';
import { 
  Stack, 
  TextInput, 
  Group, 
  Button,
  Modal
} from '@mantine/core';

export default function InviteTeamModal({ opened, onClose, onInvite }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Invite Team Member"
      size="md"
    >
      <Stack spacing="xl">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter team member's name"
        />

        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter team member's email"
          type="email"
        />

        <Group position="right">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onInvite({ name, email });
              setName('');
              setEmail('');
            }}
          >
            Send Invitation
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
