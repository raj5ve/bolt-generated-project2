import { Container, Grid, Modal, MediaQuery, Button, Group, Paper, Stack, Avatar, Text, Badge } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getServiceBySlug } from '../api/services';
import { getProfile } from '../api/profile';
import ContactForm from '../components/ContactForm';
import PublicLayout from '../components/public/PublicLayout';
import ServiceContent from '../components/service/ServiceContent';

export default function ServicePage() {
  const { username, serviceSlug } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { data: service, isLoading: serviceLoading } = useQuery(
    ['service', username, serviceSlug],
    () => getServiceBySlug(serviceSlug)
  );

  const { data: profile, isLoading: profileLoading } = useQuery(
    ['profile', username],
    () => getProfile(username)
  );

  if (serviceLoading || profileLoading) {
    return (
      <PublicLayout>
        <Container size="xl" py="xl">
          Loading...
        </Container>
      </PublicLayout>
    );
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
        <Button 
          fullWidth
          onClick={() => setIsContactModalOpen(true)}
        >
          Contact Me
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <PublicLayout>
      <Container size="xl" py="xl" px="md">
        <Grid gutter="md">
          {/* Main Content */}
          <Grid.Col xs={12} md={8}>
            <ServiceContent service={service} />
          </Grid.Col>

          {/* Desktop Profile Info - Right Side */}
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Grid.Col md={4}>
              <div style={{ position: 'sticky', top: '1rem' }}>
                <ProfileInfo />
              </div>
            </Grid.Col>
          </MediaQuery>

          {/* Mobile Profile Info - Bottom */}
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Grid.Col xs={12}>
              <ProfileInfo />
            </Grid.Col>
          </MediaQuery>
        </Grid>

        {/* Contact Modal */}
        <Modal
          opened={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title="Contact Freelancer"
          size="lg"
        >
          <ContactForm onSubmit={() => setIsContactModalOpen(false)} />
        </Modal>
      </Container>
    </PublicLayout>
  );
}
