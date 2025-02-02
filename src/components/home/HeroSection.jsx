import { Title, Text, Button, Group, Stack, Container, MediaQuery } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Container size="xl" px="md">
      <Stack spacing={50} py={100} align="center">
        <Stack spacing="xs" align="center" sx={{ maxWidth: 800 }}>
          <MediaQuery smallerThan="sm" styles={{ textAlign: 'center', fontSize: '2rem !important' }}>
            <Title 
              align="center" 
              sx={(theme) => ({
                fontSize: '3rem',
                fontWeight: 900,
                lineHeight: 1.2,
                [theme.fn.smallerThan('sm')]: {
                  fontSize: '2rem',
                },
              })}
            >
              Find and Hire Expert
              <Text 
                component="span" 
                color="blue" 
                inherit
              > Professionals </Text>
              for Any Project
            </Title>
          </MediaQuery>

          <Text 
            color="dimmed" 
            size="xl" 
            align="center"
            px="md"
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                fontSize: theme.fontSizes.lg,
              },
            })}
          >
            Connect with skilled professionals, manage projects, and grow your business with our all-in-one platform
          </Text>
        </Stack>

        <Group spacing="md" position="center">
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/search')}
          >
            Find Professionals
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
