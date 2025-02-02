import { Navbar, UnstyledButton, Group, Text } from '@mantine/core';
import { 
  IconDashboard, 
  IconMessage, 
  IconShoppingCart,
  IconChartBar,
  IconSettings,
  IconList
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: IconDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: IconList, label: 'Services', path: '/services' },
  { icon: IconMessage, label: 'Messages', path: '/messages' },
  { icon: IconShoppingCart, label: 'Orders', path: '/orders' },
  { icon: IconChartBar, label: 'Analytics', path: '/analytics' },
  { icon: IconSettings, label: 'Settings', path: '/settings' }
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar.Section grow mt="xs">
      {navItems.map((item) => (
        <UnstyledButton
          key={item.label}
          onClick={() => navigate(item.path)}
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colors.gray[7],
            backgroundColor: location.pathname === item.path ? theme.colors.gray[0] : 'transparent',
            '&:hover': {
              backgroundColor: theme.colors.gray[0],
            },
          })}
        >
          <Group spacing="sm" noWrap>
            <item.icon size={20} />
            <Text size="sm" style={{ whiteSpace: 'nowrap' }}>
              {item.label}
            </Text>
          </Group>
        </UnstyledButton>
      ))}
    </Navbar.Section>
  );
}
