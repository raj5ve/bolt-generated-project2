import { Container, Paper, Text, Button, Grid, Avatar, Group, Stack, Badge, MediaQuery } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from '../api/profile';
import ServicesList from './ServicesList';
import Portfolio from './Portfolio';
import Reviews from './Reviews';
import ContactForm from './ContactForm';

export default function Profile() {
  const { username } = useParams();
  const { data: profile, isLoading } = useQuery(
    ['profile', username],
    () => getProfile(username)
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container size="xl" px="md">
      <Grid gutter="md">
        <Grid.Col xs={12} md={8} orderSm={2} orderXs={2}>
          <Stack spacing="md">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Paper p="md" radius="md" withBorder>
                <Group>
                  <Avatar 
                    size={80} 
                    radius={80} 
                    src={profile?.avatar}
                    color="blue"
                  >
                    {profile?.name?.[0]}
                  </Avatar>
                  <div>
                    <Text size="xl" weight={700}>
                      {profile?.name}
                    </Text>
                    <Text size="lg" color="dimmed">
                      {profile?.title}
                    </Text>
                    <Badge mt="xs">
                      ${profile?.hourlyRate}/hour
                    </Badge>
                  </div>
                </Group>
              </Paper>
            </MediaQuery>

            <Paper p="md" radius="md" withBorder>
              <Text size="xl" weight={500} mb="md">
                About Me
              </Text>
              <Text>
                {profile?.bio}
              </Text>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Text size="xl" weight={500} mb="md">
                Services
              </Text>
              <ServicesList services={profile?.services} />
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Text size="xl" weight={500} mb="md">
                Portfolio
              </Text>
              <Portfolio items={profile?.portfolio} />
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Text size="xl" weight={500} mb="md">
                Reviews
              </Text>
              <Reviews reviews={profile?.reviews} />
            </Paper>
          </Stack>
        </Grid.Col>

        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Grid.Col md={4} orderSm={1} orderXs={1}>
            <Paper p="md" radius="md" withBorder sx={{ position: 'sticky', top: '1rem' }}>
              <Stack spacing="md">
                <Avatar 
                  size={120} 
                  radius={120} 
                  src={profile?.avatar}
                  mx="auto"
                  color="blue"
                >
                  {profile?.name?.[0]}
                </Avatar>
                <Text align="center" size="xl" weight={700}>
                  {profile?.name}
                </Text>
                <Text align="center" size="lg" color="dimmed">
                  {profile?.title}
                </Text>
                <Badge size="lg" mx="auto">
                  ${profile?.hourlyRate}/hour
                </Badge>
                <Button fullWidth>
                  Contact Me
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </Container>
  );
}
