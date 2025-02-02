import { 
  Modal, 
  Stack, 
  Text, 
  Group, 
  ThemeIcon, 
  Timeline, 
  Grid, 
  Paper 
} from '@mantine/core';
import { 
  IconCheck, 
  IconClock, 
  IconFileDescription, 
  IconPackage 
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import OrderMessages from './OrderMessages';
import OrderAttachments from './OrderAttachments';
import OrderDeliverables from './OrderDeliverables';

export default function OrderDetailsModal({ opened, onClose, order }) {
  if (!order) return null;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Order Details - ${order.id}`}
      size="lg"
    >
      <Stack spacing="xl">
        <div>
          <Text weight={500} mb="xs">Description</Text>
          <Text size="sm" color="dimmed">
            {order.description || 'No description provided'}
          </Text>
        </div>

        <OrderDeliverables deliverables={order.deliverables} />

        <div>
          <Text weight={500} mb="xs">Timeline</Text>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item 
              bullet={<IconClock size={12} />} 
              title="Order Placed"
            >
              <Text color="dimmed" size="sm">
                {formatDate(order.timeline.ordered)}
              </Text>
            </Timeline.Item>
            
            {order.timeline.deadline && (
              <Timeline.Item 
                bullet={<IconPackage size={12} />} 
                title="Deadline"
              >
                <Text color="dimmed" size="sm">
                  {formatDate(order.timeline.deadline)}
                </Text>
              </Timeline.Item>
            )}

            {order.timeline.completed && (
              <Timeline.Item 
                bullet={<IconCheck size={12} />} 
                title="Completed"
              >
                <Text color="dimmed" size="sm">
                  {formatDate(order.timeline.completed)}
                </Text>
              </Timeline.Item>
            )}
          </Timeline>
        </div>

        {order.completionDetails && (
          <div>
            <Text weight={500} mb="xs">Completion Details</Text>
            <Stack spacing="md">
              <div>
                <Text size="sm" weight={500}>Work Summary</Text>
                <Text size="sm" color="dimmed">
                  {order.completionDetails.workSummary}
                </Text>
              </div>
              {order.completionDetails.notes && (
                <div>
                  <Text size="sm" weight={500}>Additional Notes</Text>
                  <Text size="sm" color="dimmed">
                    {order.completionDetails.notes}
                  </Text>
                </div>
              )}
            </Stack>
          </div>
        )}

        <Grid>
          <Grid.Col span={6}>
            <OrderMessages 
              messages={order.messages || []} 
              clientName={order.client.name} 
            />
          </Grid.Col>
          
          <Grid.Col span={6}>
            <OrderAttachments 
              attachments={order.attachments || []} 
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
}
