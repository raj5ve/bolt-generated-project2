import { useState } from 'react';
import { Paper, Box, Tabs } from '@mantine/core';
import { 
  IconUser, 
  IconCreditCard, 
  IconBell, 
  IconForms, 
  IconFileText,
  IconNotes,
  IconWorld,
  IconUsers
} from '@tabler/icons-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import FormSettings from '../components/settings/FormSettings';
import DocumentSettings from '../components/settings/DocumentSettings';
import QuickNoteSettings from '../components/settings/QuickNoteSettings';
import WhiteLabelSettings from '../components/settings/WhiteLabelSettings';
import TeamSettings from '../components/settings/TeamSettings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Paper p={0} sx={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        orientation="vertical"
        sx={(theme) => ({
          display: 'flex',
          width: '100%',
          '& .mantine-Tabs-root': {
            display: 'flex',
          }
        })}
      >
        <Tabs.List
          sx={(theme) => ({
            width: 250,
            borderRight: `1px solid ${theme.colors.gray[3]}`,
            minHeight: 'calc(100vh - 120px)',
            backgroundColor: theme.colors.gray[0]
          })}
        >
          <Tabs.Tab 
            value="profile" 
            icon={<IconUser size={16} />}
            sx={{ height: 50 }}
          >
            Profile Settings
          </Tabs.Tab>
          <Tabs.Tab 
            value="payment" 
            icon={<IconCreditCard size={16} />}
            sx={{ height: 50 }}
          >
            Payment Settings
          </Tabs.Tab>
          <Tabs.Tab 
            value="notifications" 
            icon={<IconBell size={16} />}
            sx={{ height: 50 }}
          >
            Notifications
          </Tabs.Tab>
          <Tabs.Tab 
            value="forms" 
            icon={<IconForms size={16} />}
            sx={{ height: 50 }}
          >
            Forms
          </Tabs.Tab>
          <Tabs.Tab 
            value="documents" 
            icon={<IconFileText size={16} />}
            sx={{ height: 50 }}
          >
            Documents
          </Tabs.Tab>
          <Tabs.Tab 
            value="quicknotes" 
            icon={<IconNotes size={16} />}
            sx={{ height: 50 }}
          >
            Quick Notes
          </Tabs.Tab>
          <Tabs.Tab 
            value="whitelabel" 
            icon={<IconWorld size={16} />}
            sx={{ height: 50 }}
          >
            White Label
          </Tabs.Tab>
          <Tabs.Tab 
            value="team" 
            icon={<IconUsers size={16} />}
            sx={{ height: 50 }}
          >
            Team
          </Tabs.Tab>
        </Tabs.List>

        <Box sx={{ flex: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Tabs.Panel value="profile" sx={{ width: '100%' }}>
            <ProfileSettings />
          </Tabs.Panel>

          <Tabs.Panel value="payment" sx={{ width: '100%' }}>
            <PaymentSettings />
          </Tabs.Panel>

          <Tabs.Panel value="notifications" sx={{ width: '100%' }}>
            <NotificationSettings />
          </Tabs.Panel>

          <Tabs.Panel value="forms" sx={{ width: '100%' }}>
            <FormSettings />
          </Tabs.Panel>

          <Tabs.Panel value="documents" sx={{ width: '100%' }}>
            <DocumentSettings />
          </Tabs.Panel>

          <Tabs.Panel value="quicknotes" sx={{ width: '100%' }}>
            <QuickNoteSettings />
          </Tabs.Panel>

          <Tabs.Panel value="whitelabel" sx={{ width: '100%' }}>
            <WhiteLabelSettings />
          </Tabs.Panel>

          <Tabs.Panel value="team" sx={{ width: '100%' }}>
            <TeamSettings />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Paper>
  );
}
