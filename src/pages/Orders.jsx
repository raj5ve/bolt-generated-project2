import { 
  Tabs, 
  Paper, 
  Title, 
  Text,
  Stack
} from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus } from '../api/orders';
import { IconCheck, IconClock, IconX } from '@tabler/icons-react';
import OrderCard from '../components/orders/OrderCard';

export default function Orders() {
  const queryClient = useQueryClient();
  const { data: orders = [] } = useQuery(['orders'], getOrders);

  const updateStatusMutation = useMutation(
    ({ id, status, completionData }) => updateOrderStatus(id, status, completionData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['orders']);
      },
    }
  );

  return (
    <Paper p="xl">
      <Title order={2} mb="xl">Orders</Title>
      
      <Tabs defaultValue="active">
        <Tabs.List>
          <Tabs.Tab 
            value="active" 
            icon={<IconClock size={14} />}
          >
            Active Orders
          </Tabs.Tab>
          <Tabs.Tab 
            value="completed" 
            icon={<IconCheck size={14} />}
          >
            Completed
          </Tabs.Tab>
          <Tabs.Tab 
            value="cancelled" 
            icon={<IconX size={14} />}
          >
            Cancelled
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active" pt="xl">
          <Stack spacing="lg">
            {orders
              .filter(order => order.status === 'active')
              .map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onStatusUpdate={(id, status, completionData) => 
                    updateStatusMutation.mutate({ id, status, completionData })
                  }
                />
              ))}
            {orders.filter(order => order.status === 'active').length === 0 && (
              <Text color="dimmed" align="center">No active orders</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="completed" pt="xl">
          <Stack spacing="lg">
            {orders
              .filter(order => order.status === 'completed')
              .map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                />
              ))}
            {orders.filter(order => order.status === 'completed').length === 0 && (
              <Text color="dimmed" align="center">No completed orders</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="cancelled" pt="xl">
          <Stack spacing="lg">
            {orders
              .filter(order => order.status === 'cancelled')
              .map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                />
              ))}
            {orders.filter(order => order.status === 'cancelled').length === 0 && (
              <Text color="dimmed" align="center">No cancelled orders</Text>
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
