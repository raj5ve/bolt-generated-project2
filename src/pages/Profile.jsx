import { Container, Paper, Text, Button, Grid, Avatar, Group, Stack, Badge, MediaQuery, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from '../api/profile';
import ServicesList from '../components/ServicesList';
import Portfolio from '../components/Portfolio';
import Reviews from '../components/Reviews';
import ContactForm from '../components/ContactForm';

export default function Profile() {
  const { username } = useParams();
  const { data: profile, isLoading } = useQuery(
    ['profile', username],
    () => getProfile(username)
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const ProfileInfo = () => (
    <Paper p="md" radius="md" withBorder>
      <Stack spacing="md" align="center">
        <Avatar 
          size={120} 
          radius={120} 
          src={profile?.avatar}
          color="blue"
        >
          {profile?.name?.[0]}
        </Avatar>
        <Stack spacing="xs" align="center">
          <Text size="xl" weight={700}>
            {profile?.name}
          </Text>
          <Text size="lg" color="dimmed">
            {profile?.title}
          </Text>
          <Text size="sm" color="dimmed">
            {profile?.location}
          </Text>
          <Badge size="lg">
            ${profile?.hourlyRate}/hour
          </Badge>
        </Stack>
        <Button fullWidth>
          Contact Me
        </Button>
        <Text size="sm" align="center">
          {profile?.bio}
        </Text>
        {profile?.skills?.length > 0 && (
          <Box mt="sm">
            <Text size="sm" weight={500} mb="xs" align="center">Skills</Text>
            <Group spacing="xs" position="center">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="outline" size="sm">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Box>
        )}
      </Stack>
    </Paper>
  );

  // Mobile Content
  const MobileContent = () => (
    <Stack spacing="md">
      <ProfileInfo />
      
      <Paper p="md" radius="md" withBorder>
        <Text size="xl" weight={500} mb="md">
          Services
        </Text>
        <ServicesList services={profile?.services} username={username} />
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
  );

  // Desktop Content
  const DesktopContent = () => (
    <Grid gutter="md">
      <Grid.Col md={8}>
        <Stack spacing="md">
          <Paper p="md" radius="md" withBorder>
            <Text size="xl" weight={500} mb="md">
              Services
            </Text>
            <ServicesList services={profile?.services} username={username} />
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

      <Grid.Col md={4}>
        <div style={{ position: 'sticky', top: '1rem' }}>
          <ProfileInfo />
        </div>
      </Grid.Col>
    </Grid>
  );

  return (
    <Container size="xl" px="md">
      {/* Mobile View */}
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Box>
          <MobileContent />
        </Box>
      </MediaQuery>

      {/* Desktop View */}
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Box>
          <DesktopContent />
        </Box>
      </MediaQuery>
    </Container>
  );
}
