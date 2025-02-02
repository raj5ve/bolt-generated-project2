import { Stack, Text, Paper, Group, ThemeIcon } from '@mantine/core';
import { IconFileDescription } from '@tabler/icons-react';

export default function OrderAttachments({ attachments = [] }) {
  if (!attachments.length) {
    return (
      <Stack spacing="xs">
        <Text weight={500}>Attachments</Text>
        <Text color="dimmed" size="sm">No attachments</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="xs">
      <Text weight={500}>Attachments</Text>
      {attachments.map((file) => (
        <Paper key={file.id} withBorder p="xs">
          <Group>
            <ThemeIcon size="md" radius="xl" color="blue">
              <IconFileDescription size={16} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Text size="sm">{file.name}</Text>
              <Text size="xs" color="dimmed">
                {file.type.toUpperCase()}
              </Text>
            </div>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
