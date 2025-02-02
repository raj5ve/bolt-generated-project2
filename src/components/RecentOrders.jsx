import { Table, Badge, Text, ScrollArea, MediaQuery, Paper, Group, Stack } from '@mantine/core';

const getStatusColor = (status) => {
  const colors = {
    active: 'blue',
    completed: 'green',
    cancelled: 'red',
    pending: 'yellow'
  };
  return colors[status] || 'gray';
};

export default function RecentOrders({ orders = [] }) {
  if (!orders?.length) {
    return <Text color="dimmed">No recent orders</Text>;
  }

  // Mobile view component
  const MobileOrderCard = ({ order }) => (
    <Paper withBorder p="md" radius="sm">
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="sm" weight={500}>Order #{order.id}</Text>
          <Badge color={getStatusColor(order.status)}>
            {order.status}
          </Badge>
        </Group>
        
        <Text size="sm" color="dimmed">
          {order.service}
        </Text>
        
        <Group position="apart">
          <Text size="sm">{order.client}</Text>
          <Text size="sm" weight={500}>${order.amount}</Text>
        </Group>
      </Stack>
    </Paper>
  );

  // Desktop view component
  const DesktopTable = () => (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Service</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Text size="sm">#{order.id}</Text>
              </td>
              <td>
                <Text size="sm">{order.service}</Text>
              </td>
              <td>
                <Text size="sm">{order.client}</Text>
              </td>
              <td>
                <Text size="sm">${order.amount}</Text>
              </td>
              <td>
                <Badge color={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );

  return (
    <>
      {/* Desktop View */}
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <div>
          <DesktopTable />
        </div>
      </MediaQuery>

      {/* Mobile View */}
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Stack spacing="sm">
          {orders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))}
        </Stack>
      </MediaQuery>
    </>
  );
}
