import { Container, Grid, Modal, MediaQuery } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProfile } from '../api/profile';
import ContactForm from '../components/ContactForm';
import PublicLayout from '../components/public/PublicLayout';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileContent from '../components/profile/ProfileContent';

export default function PublicProfile() {
  const { username } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const { data: profile, isLoading } = useQuery(
    ['profile', username],
    () => getProfile(username)
  );

  if (isLoading) {
    return <PublicLayout><Container>Loading...</Container></PublicLayout>;
  }

  return (
    <PublicLayout>
      <Container size="xl" py="xl">
        <Grid>
          {/* Mobile Profile Info - Top */}
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Grid.Col xs={12}>
              <ProfileSidebar 
                profile={profile}
                onContact={() => setIsContactModalOpen(true)}
              />
            </Grid.Col>
          </MediaQuery>

          {/* Main Content */}
          <Grid.Col xs={12} md={8}>
            <ProfileContent 
              profile={profile}
              username={username}
            />
          </Grid.Col>

          {/* Desktop Profile Info - Right Side */}
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Grid.Col md={4}>
              <div style={{ position: 'sticky', top: '1rem' }}>
                <ProfileSidebar 
                  profile={profile}
                  onContact={() => setIsContactModalOpen(true)}
                />
              </div>
            </Grid.Col>
          </MediaQuery>
        </Grid>

        {/* Contact Modal */}
        <Modal
          opened={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title="Contact Professional"
          size="lg"
        >
          <ContactForm onSubmit={() => setIsContactModalOpen(false)} />
        </Modal>
      </Container>
    </PublicLayout>
  );
}
