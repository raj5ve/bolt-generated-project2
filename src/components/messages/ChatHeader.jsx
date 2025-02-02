import { Paper, Group, Avatar, Text } from '@mantine/core';

export default function ChatHeader({ chat }) {
  return (
    <Paper p="md" withBorder>
      <Group position="apart">
        <Group>
          <Avatar color="blue" radius="xl" size="md">
            {chat.user.name[0]}
          </Avatar>
          <div>
            <Text weight={500}>{chat.user.name}</Text>
            <Text size="xs" color="dimmed">
              {chat.user.email}
            </Text>
          </div>
        </Group>
      </Group>
    </Paper>
  );
}
