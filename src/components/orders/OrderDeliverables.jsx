import { Stack, Text, Group, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function OrderDeliverables({ deliverables = [] }) {
  if (!deliverables?.length) {
    return (
      <div>
        <Text weight={500} mb="xs">Deliverables</Text>
        <Text color="dimmed" size="sm">No deliverables specified</Text>
      </div>
    );
  }

  return (
    <div>
      <Text weight={500} mb="xs">Deliverables</Text>
      <Stack spacing="xs">
        {deliverables.map((item, index) => (
          <Group key={index} spacing="xs">
            <ThemeIcon size="sm" radius="xl" color="blue">
              <IconCheck size={12} />
            </ThemeIcon>
            <Text size="sm">{item}</Text>
          </Group>
        ))}
      </Stack>
    </div>
  );
}
