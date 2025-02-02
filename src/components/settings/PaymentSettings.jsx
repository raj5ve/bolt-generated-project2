import { Paper, Stack, Text, Button, Switch, Divider, Container } from '@mantine/core';
import { IconBrandStripe } from '@tabler/icons-react';

export default function PaymentSettings() {
  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Paper withBorder p="xl" radius="md">
          <Text size="xl" weight={500} mb="xl">Payment Integration</Text>
          <Stack spacing="xl">
            <Button 
              leftIcon={<IconBrandStripe size={20} />}
              variant="outline"
              size="md"
            >
              Connect Stripe Account
            </Button>
            
            <Divider my="md" />
            
            <Switch
              label="Automatic payouts"
              description="Automatically transfer earnings to your bank account"
              size="md"
            />
          </Stack>
        </Paper>

        <Paper withBorder p="xl" radius="md">
          <Text size="xl" weight={500} mb="xl">Payout Settings</Text>
          <Stack spacing="xl">
            <Switch
              label="Weekly payouts"
              description="Receive payments every week"
              size="md"
            />
            
            <Switch
              label="Hold payments"
              description="Hold payments until order completion"
              size="md"
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
