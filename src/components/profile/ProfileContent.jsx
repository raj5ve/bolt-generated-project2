import { Stack, Paper, Text } from '@mantine/core';
import ServicesList from '../ServicesList';
import Portfolio from '../Portfolio';
import Reviews from '../Reviews';

export default function ProfileContent({ profile, username }) {
  return (
    <Stack spacing="xl">
      {/* Services Section */}
      <Paper withBorder p="xl" radius="md">
        <Text size="xl" weight={500} mb="md">
          Services
        </Text>
        <ServicesList 
          services={profile?.services} 
          username={username}
        />
      </Paper>

      {/* Portfolio Section */}
      <Paper withBorder p="xl" radius="md">
        <Text size="xl" weight={500} mb="md">
          Portfolio
        </Text>
        <Portfolio items={profile?.portfolio} />
      </Paper>

      {/* Reviews Section */}
      <Paper withBorder p="xl" radius="md">
        <Text size="xl" weight={500} mb="md">
          Reviews
        </Text>
        <Reviews reviews={profile?.reviews} />
      </Paper>
    </Stack>
  );
}
