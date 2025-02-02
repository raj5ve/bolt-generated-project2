import { Container, Grid, Modal, MediaQuery, Button, Group } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getService } from '../api/services';
import { getProfile } from '../api/profile';
import ContactForm from './ContactForm';
import PublicLayout from './public/PublicLayout';
import ProfileSidebar from './profile/ProfileSidebar';
import ServiceContent from './service/ServiceContent';

export default function ServicePage() {
  const { username, serviceSlug } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { data: service, isLoading: serviceLoading } = useQuery(
    ['service', username, serviceSlug],
    () => getService(username, serviceSlug)
  );

  const { data: profile, isLoading: profileLoading } = useQuery(
    ['profile', username],
    () => getProfile(username)
  );

  if (serviceLoading || profileLoading) {
    return <PublicLayout><Container>Loading...</Container></PublicLayout>;
  }

  return (
    <PublicLayout>
      <Container size="xl" py="xl" px="md">
        <Grid gutter="md">
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Grid.Col md={4}>
              <ProfileSidebar 
                profile={profile}
                onContact={() => setIsContactModalOpen(true)}
              />
            </Grid.Col>
          </MediaQuery>

          <Grid.Col xs={12} md={8}>
            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
              <Group position="center" mb="md">
                <Button onClick={() => setIsContactModalOpen(true)}>
                  Contact Freelancer
                </Button>
              </Group>
            </MediaQuery>
            
            <ServiceContent service={service} />
          </Grid.Col>
        </Grid>

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
