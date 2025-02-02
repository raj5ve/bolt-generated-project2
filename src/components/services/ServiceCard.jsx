import { Paper, Text, Group, Badge, Button, Stack } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getServiceStartingPrice } from '../../api/services';

export default function ServiceCard({ service, onDelete }) {
  const navigate = useNavigate();

  return (
    <Paper withBorder p="md">
      <Stack spacing="xs">
        <Group position="apart" align="flex-start">
          <div style={{ flex: 1 }}>
            <Text size="lg" weight={500} lineClamp={2}>
              {service.title}
            </Text>
            <Text color="dimmed" size="sm" mt={4} lineClamp={2}>
              {service.description}
            </Text>
          </div>
          <Group spacing={8}>
            <Button 
              variant="light" 
              size="xs"
              leftIcon={<IconPencil size={14} />}
              onClick={() => navigate(`/services/edit/${service.id}`)}
            >
              Edit
            </Button>
            <Button 
              variant="light" 
              color="red" 
              size="xs"
              leftIcon={<IconTrash size={14} />}
              onClick={() => onDelete(service.id)}
            >
              Delete
            </Button>
          </Group>
        </Group>

        <Group position="apart" mt="xs">
          <Group spacing="xs">
            <Badge color={service.availability === 'Available' ? 'green' : 'yellow'}>
              {service.availability}
            </Badge>
            <Badge color="blue">{service.category}</Badge>
          </Group>
          <Text size="sm" weight={500} color="dimmed">
            {getServiceStartingPrice(service)}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
