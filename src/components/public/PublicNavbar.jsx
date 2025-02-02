import { Header, Container, Group, Text, Button, Menu, Avatar } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { IconUser, IconLogout } from '@tabler/icons-react';
import useAuthStore from '../../store/useAuthStore';

export default function PublicNavbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Header height={70} sx={{ borderBottom: '1px solid #eee' }}>
      <Container size="xl" h="100%">
        <Group position="apart" h="100%">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text size="xl" weight={700} color="blue">
              WorkWad
            </Text>
          </Link>

          {isAuthenticated ? (
            <Menu position="bottom-end" shadow="md">
              <Menu.Target>
                <Group spacing="xs" sx={{ cursor: 'pointer' }}>
                  <Avatar 
                    src={user?.avatar} 
                    radius="xl" 
                    size="sm" 
                    color="blue"
                  >
                    {user?.name?.[0]}
                  </Avatar>
                  <Text size="sm">{user?.username}</Text>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item 
                  icon={<IconUser size={14} />}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Menu.Item>
                <Menu.Item 
                  icon={<IconLogout size={14} />}
                  color="red"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button 
              variant="light"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
        </Group>
      </Container>
    </Header>
  );
}
