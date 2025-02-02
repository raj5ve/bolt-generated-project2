import { useState, useRef } from 'react';
import { 
  Paper, 
  Text, 
  Stack, 
  Box, 
  ScrollArea, 
  Modal,
  MediaQuery,
  Drawer
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../api/messages';
import Sidebar from './messages/Sidebar';
import ChatHeader from './messages/ChatHeader';
import MessageBubble from './messages/MessageBubble';
import MessageInput from './messages/MessageInput';
import AttachmentPreview from './messages/AttachmentPreview';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const messageText = watch('message', '');
  const scrollViewportRef = useRef(null);

  const { data: messages = [] } = useQuery(['messages'], getMessages);

  const filteredMessages = messages.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Paper p={0} sx={{ display: 'flex', height: 'calc(100vh - 120px)', position: 'relative' }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Sidebar
            messages={filteredMessages}
            selectedChat={selectedChat}
            onChatSelect={setSelectedChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </MediaQuery>

        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Drawer
            opened={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
            size="100%"
            padding="md"
          >
            <Sidebar
              messages={filteredMessages}
              selectedChat={selectedChat}
              onChatSelect={(chat) => {
                setSelectedChat(chat);
                setIsMobileDrawerOpen(false);
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </Drawer>
        </MediaQuery>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Rest of the component remains the same */}
        </Box>
      </Paper>

      <Modal
        opened={!!previewImage}
        onClose={() => setPreviewImage(null)}
        size="xl"
        padding="xs"
      >
        {previewImage && (
          <img
            src={previewImage.url}
            alt={previewImage.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </Modal>
    </>
  );
}
