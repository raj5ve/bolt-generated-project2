import { Paper, Text, Box, TextInput, Divider, Stack, Group, Avatar, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

export default function Sidebar({ 
  messages, 
  selectedChat, 
  onChatSelect, 
  searchQuery, 
  onSearchChange 
}) {
  return (
    <Paper 
      withBorder 
      sx={{ 
        width: 320,
        borderRight: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box p="md">
        <Text weight={600} size="lg" mb="md">Messages</Text>
        <TextInput
          placeholder="Search conversations..."
          icon={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>

      <Divider />

      <ScrollArea h="calc(100vh - 220px)">
        <Stack spacing={0}>
          {messages.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              style={{
                padding: '1rem',
                width: '100%',
                border: 'none',
                background: selectedChat?.id === chat.id ? '#f8f9fa' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
            >
              <Group>
                <Avatar color="blue" radius="xl" size="md">
                  {chat.user.name[0]}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size="sm" weight={500} lineClamp={1}>
                    {chat.user.name}
                  </Text>
                  <Text size="xs" color="dimmed" lineClamp={1}>
                    {chat.lastMessage.content}
                  </Text>
                </div>
                <Text size="xs" color="dimmed" align="right" style={{ whiteSpace: 'nowrap' }}>
                  {formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: true })}
                </Text>
              </Group>
            </button>
          ))}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}
