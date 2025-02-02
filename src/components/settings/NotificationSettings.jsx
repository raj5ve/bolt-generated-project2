import { Paper, Stack, Text, Switch, Container } from '@mantine/core';

export default function NotificationSettings() {
  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Paper withBorder p="xl" radius="md">
          <Text size="xl" weight={500} mb="xl">Email Notifications</Text>
          <Stack spacing="xl">
            <Switch
              label="New messages"
              description="Receive email notifications for new messages"
              size="md"
            />
            
            <Switch
              label="New orders"
              description="Get notified when you receive new orders"
              size="md"
            />
            
            <Switch
              label="Order updates"
              description="Get notified when order status changes"
              size="md"
            />
          </Stack>
        </Paper>

        <Paper withBorder p="xl" radius="md">
          <Text size="xl" weight={500} mb="xl">Marketing</Text>
          <Stack spacing="xl">
            <Switch
              label="Newsletter"
              description="Receive our newsletter and product updates"
              size="md"
            />
            
            <Switch
              label="Promotional emails"
              description="Receive promotional offers and discounts"
              size="md"
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
