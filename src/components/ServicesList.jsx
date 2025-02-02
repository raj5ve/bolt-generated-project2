import { Card, Text, Group, Badge, SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { formatServiceSlug } from '../api/services';

export default function ServicesList({ services = [], username }) {
  const navigate = useNavigate();

  if (!services?.length) {
    return <Text color="dimmed">No services available</Text>;
  }

  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {services.map((service) => (
        <Card 
          key={service.id} 
          shadow="sm" 
          p="lg"
          radius="md"
          withBorder
          sx={(theme) => ({
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors.gray[0]
            }
          })}
          onClick={() => navigate(`/${username}/${formatServiceSlug(service.title)}`)}
        >
          <Group position="apart" mb="xs">
            <Text weight={500} lineClamp={2}>
              {service.title}
            </Text>
            <Badge color={service.availability === 'Available' ? 'green' : 'yellow'}>
              {service.availability}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" mb="md" lineClamp={2}>
            {service.description}
          </Text>

          <Group position="apart">
            <Text weight={500} size="sm">
              {service.price}
            </Text>
            <Badge color="blue">{service.type}</Badge>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
}
