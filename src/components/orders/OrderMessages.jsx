import { Stack, Text, Paper, Group } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';

export default function OrderMessages({ messages = [], clientName }) {
  if (!messages.length) {
    return (
      <Stack spacing="xs">
        <Text weight={500}>Recent Messages</Text>
        <Text color="dimmed" size="sm">No messages yet</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="xs">
      <Text weight={500}>Recent Messages</Text>
      {messages.map((message) => (
        <Paper key={message.id} withBorder p="xs">
          <Group position="apart" mb={4}>
            <Text size="xs" weight={500}>
              {message.sender === 'client' ? clientName : 'You'}
            </Text>
            <Text size="xs" color="dimmed">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </Text>
          </Group>
          <Text size="sm">{message.content}</Text>
        </Paper>
      ))}
    </Stack>
  );
}
