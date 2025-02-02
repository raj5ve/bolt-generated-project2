import { Paper, Text, Group } from '@mantine/core';

export default function StatsCard({ title, value = 0, type }) {
  const formatValue = () => {
    if (value === undefined || value === null) {
      return '0';
    }

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'rating':
        return `${Number(value).toFixed(1)} / 5.0`;
      case 'number':
        return Number(value).toLocaleString();
      default:
        return value.toString();
    }
  };

  return (
    <Paper p="md" radius="md" sx={{ minWidth: 200 }}>
      <Group position="apart">
        <Text size="xs" color="dimmed" transform="uppercase">
          {title}
        </Text>
      </Group>
      <Text size="xl" weight={700} mt="md">
        {formatValue()}
      </Text>
    </Paper>
  );
}
