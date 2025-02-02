import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Image,
  Stack,
  useMantineTheme
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';

export default function NotFound() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  return (
    <Container size="md" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Stack align="center" spacing="xl" style={{ width: '100%' }}>
        <Image
          src="https://illustrations.popsy.co/gray/falling.svg"
          alt="404"
          style={{ width: '100%', maxWidth: 400 }}
        />
        
        <Title
          align="center"
          sx={(theme) => ({
            fontSize: 48,
            fontWeight: 900,
            [theme.fn.smallerThan('sm')]: {
              fontSize: 32,
            },
          })}
        >
          Page not found
        </Title>
        
        <Text
          color="dimmed"
          size="lg"
          align="center"
          style={{ maxWidth: 500 }}
        >
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or try navigating back to the homepage.
        </Text>

        <Group>
          <Button
            variant="subtle"
            size="md"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
          <Button
            size="md"
            leftIcon={<IconHome size={16} />}
            onClick={() => navigate('/')}
          >
            Back to home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
