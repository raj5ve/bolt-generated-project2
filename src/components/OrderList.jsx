import { Table, Badge, Button, Group, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '../api/orders';

const getStatusColor = (status) => {
  const colors = {
    active: 'blue',
    completed: 'green',
    cancelled: 'red',
    pending: 'yellow'
  };
  return colors[status] || 'gray';
};

export default function OrderList({ orders = [] }) {
  const queryClient = useQueryClient();
  
  const updateStatusMutation = useMutation(
    ({ id, status }) => updateOrderStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['orders']);
      },
    }
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Service</th>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.service}</td>
            <td>{order.client}</td>
            <td>${order.amount}</td>
            <td>
              <Badge color={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </td>
            <td>
              <Group spacing="xs">
                {order.status === 'active' && (
                  <>
                    <Button
                      size="xs"
                      onClick={() => updateStatusMutation.mutate({
                        id: order.id,
                        status: 'completed'
                      })}
                    >
                      Complete
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({
                        id: order.id,
                        status: 'cancelled'
                      })}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Group>
            </td>
          </tr>
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan={6}>
              <Text align="center" color="dimmed">No orders found</Text>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
