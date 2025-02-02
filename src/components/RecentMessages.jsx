import { Paper, Text, Group, Avatar, Stack } from '@mantine/core';

export default function RecentMessages({ messages = [] }) {
  if (!messages?.length) {
    return <Text color="dimmed">No recent messages</Text>;
  }

  return (
    <Stack spacing="md">
      {messages.map((message) => (
        <Paper key={message.id} p="sm" withBorder>
          <Group>
            <Avatar color="blue" radius="xl">
              {message.sender[0]}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Group position="apart">
                <Text size="sm" weight={500}>
                  {message.sender}
                </Text>
                <Text size="xs" color="dimmed">
                  {message.timestamp}
                </Text>
              </Group>
              <Text size="sm" color="dimmed">
                {message.content}
              </Text>
            </div>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
