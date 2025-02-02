import { useState } from 'react';
import { 
  Paper, 
  Text,
  Group,
  Badge,
  Progress,
  Stack,
  Button,
  Grid,
  Avatar,
  Modal,
  Textarea,
  FileButton
} from '@mantine/core';
import { IconStar, IconUpload } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import OrderDetailsModal from './OrderDetailsModal';
import OrderCompletionForm from './OrderCompletionForm';

export default function OrderCard({ order, onStatusUpdate }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleComplete = (completionData) => {
    onStatusUpdate(order.id, 'completed', completionData);
    setIsCompletionModalOpen(false);
  };

  return (
    <>
      <Paper withBorder p="md" radius="md">
        <Stack spacing="md">
          <Group position="apart">
            <Group>
              <Text weight={500} size="lg">{order.service}</Text>
              <Badge color={getStatusColor(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </Group>
            <Text weight={500} color="dimmed">
              {order.id}
            </Text>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <Group spacing="sm">
                <Avatar 
                  radius="xl" 
                  size="md"
                  color="blue"
                >
                  {order.client.name[0]}
                </Avatar>
                <div>
                  <Text size="sm" weight={500}>
                    {order.client.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {order.client.company}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={4} align="flex-end">
                <Text size="xl" weight={700}>
                  ${order.amount.toLocaleString()}
                </Text>
                <Text size="xs" color="dimmed">
                  Ordered {formatDistanceToNow(new Date(order.timeline.ordered), { addSuffix: true })}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>

          {order.status === 'active' && (
            <>
              <Stack spacing={4}>
                <Group position="apart">
                  <Text size="sm">Progress</Text>
                  <Text size="sm" weight={500}>{order.progress}%</Text>
                </Group>
                <Progress 
                  value={order.progress} 
                  size="md" 
                  radius="xl"
                />
              </Stack>

              <Group position="apart">
                <Button variant="light" onClick={() => setIsDetailsOpen(true)}>
                  View Details
                </Button>
                <Group>
                  <Button 
                    color="red" 
                    variant="light"
                    onClick={() => onStatusUpdate(order.id, 'cancelled')}
                  >
                    Cancel Order
                  </Button>
                  <Button 
                    color="green"
                    onClick={() => setIsCompletionModalOpen(true)}
                  >
                    Complete Order
                  </Button>
                </Group>
              </Group>
            </>
          )}

          {(order.status === 'completed' || order.status === 'cancelled') && (
            <Group position="right">
              <Button variant="light" onClick={() => setIsDetailsOpen(true)}>
                View Details
              </Button>
            </Group>
          )}

          {order.status === 'completed' && order.review && (
            <Stack spacing="xs">
              <Group spacing="xs">
                {[...Array(order.review.rating)].map((_, i) => (
                  <IconStar key={i} size={16} fill="#FAB005" color="#FAB005" />
                ))}
              </Group>
              <Text size="sm" italic color="dimmed">
                "{order.review.comment}"
              </Text>
            </Stack>
          )}

          {order.status === 'cancelled' && order.cancellationReason && (
            <Text size="sm" color="red">
              Cancellation Reason: {order.cancellationReason}
            </Text>
          )}
        </Stack>
      </Paper>

      <OrderDetailsModal
        opened={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={order}
      />

      <OrderCompletionForm
        opened={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onSubmit={handleComplete}
      />
    </>
  );
}
