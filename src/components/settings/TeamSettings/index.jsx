import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  Button, 
  Group,
  Table,
  Badge,
  ActionIcon,
  Menu,
  Alert
} from '@mantine/core';
import { 
  IconPlus, 
  IconDots, 
  IconUserOff,
  IconCrown,
  IconAlertCircle
} from '@tabler/icons-react';
import InviteTeamModal from './InviteTeamModal';

export default function TeamSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [team, setTeam] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@workwad.com',
      role: 'admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@workwad.com',
      role: 'member',
      status: 'active'
    }
  ]);

  const handleRemoveMember = (memberId) => {
    setTeam(team.filter(member => member.id !== memberId));
  };

  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Group position="apart">
          <div>
            <Text size="xl" weight={500}>Team Management</Text>
            <Text size="sm" color="dimmed">Manage your team members and their access</Text>
          </div>
          <Button 
            leftIcon={<IconPlus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Invite Team Member
          </Button>
        </Group>

        <Alert icon={<IconAlertCircle size={16} />} color="blue">
          Team members will have access to all features except settings. Only admin can access and modify settings.
        </Alert>

        <Paper withBorder p="xl" radius="md">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <Group spacing="sm">
                      {member.role === 'admin' && (
                        <IconCrown size={16} style={{ color: '#fab005' }} />
                      )}
                      <Text>{member.name}</Text>
                    </Group>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <Badge
                      color={member.role === 'admin' ? 'yellow' : 'blue'}
                    >
                      {member.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      color={member.status === 'active' ? 'green' : 'gray'}
                    >
                      {member.status}
                    </Badge>
                  </td>
                  <td>
                    {member.role !== 'admin' && (
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item 
                            color="red" 
                            icon={<IconUserOff size={14} />}
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove Member
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Stack>

      <InviteTeamModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvite={(data) => {
          setTeam([...team, {
            id: String(Date.now()),
            ...data,
            role: 'member',
            status: 'pending'
          }]);
          setIsModalOpen(false);
        }}
      />
    </Container>
  );
}
