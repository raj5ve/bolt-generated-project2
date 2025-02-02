import { Group, Text, Button, Avatar, Menu, MediaQuery } from '@mantine/core';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Group position="apart" w="100%" noWrap>
      <MediaQuery smallerThan="sm" styles={{ fontSize: '1.2rem' }}>
        <Text size="xl" weight={700} color="blue" style={{ whiteSpace: 'nowrap' }}>
          WorkWad
        </Text>
      </MediaQuery>
      
      <Group spacing="sm" noWrap>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Button 
            variant="subtle" 
            onClick={() => navigate(`/${user?.username}`)}
            size="sm"
          >
            View Public Profile
          </Button>
        </MediaQuery>
        
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <Group spacing="xs" sx={{ cursor: 'pointer' }} noWrap>
              <Avatar 
                src={user?.avatar} 
                radius="xl" 
                size="sm" 
                color="blue"
              >
                {user?.name?.[0]}
              </Avatar>
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Text size="sm">{user?.name}</Text>
              </MediaQuery>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item 
              icon={<IconUser size={14} />}
              onClick={() => navigate(`/${user?.username}`)}
            >
              View Profile
            </Menu.Item>
            <Menu.Item 
              icon={<IconLogout size={14} />}
              onClick={handleLogout}
              color="red"
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
