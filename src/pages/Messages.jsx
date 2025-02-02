import { useState, useRef } from 'react';
import { Paper, Text, Stack, Box, ScrollArea, Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../api/messages';
import Sidebar from '../components/messages/Sidebar';
import ChatHeader from '../components/messages/ChatHeader';
import MessageBubble from '../components/messages/MessageBubble';
import MessageInput from '../components/messages/MessageInput';
import AttachmentPreview from '../components/messages/AttachmentPreview';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const messageText = watch('message', '');
  const scrollViewportRef = useRef(null);

  const { data: messages = [] } = useQuery(['messages'], getMessages);

  const filteredMessages = messages.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      progress: 100,
      type: file.type,
      name: file.name,
      size: file.size
    }));

    setAttachments(prev => [...prev, ...newFiles]);
  };

  const handleSendMessage = async (data) => {
    if (!selectedChat || (!data.message.trim() && attachments.length === 0)) return;

    try {
      setIsSubmitting(true);

      const messageAttachments = attachments.map(att => ({
        id: att.id,
        name: att.name,
        type: att.type,
        size: att.size,
        url: URL.createObjectURL(att.file)
      }));

      const newMessage = {
        id: String(Date.now()),
        content: data.message,
        timestamp: new Date().toISOString(),
        isSender: true,
        attachments: messageAttachments
      };

      selectedChat.messages.push(newMessage);
      selectedChat.lastMessage = {
        content: attachments.length ? `${data.message || 'Sent attachments'}` : data.message,
        timestamp: new Date().toISOString()
      };

      reset();
      setAttachments([]);

      setTimeout(() => {
        if (scrollViewportRef.current) {
          scrollViewportRef.current.scrollTo({
            top: scrollViewportRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Paper p={0} sx={{ display: 'flex', height: 'calc(100vh - 120px)', position: 'relative' }}>
        <Sidebar
          messages={filteredMessages}
          selectedChat={selectedChat}
          onChatSelect={setSelectedChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {selectedChat ? (
            <>
              <ChatHeader chat={selectedChat} />

              <ScrollArea 
                sx={{ flex: 1 }}
                p="md" 
                offsetScrollbars
                viewportRef={scrollViewportRef}
              >
                {selectedChat.messages.length === 0 ? (
                  <Stack align="center" justify="center" h="100%" spacing="xs">
                    <Text size="xl" weight={500} color="dimmed">No messages yet</Text>
                    <Text color="dimmed">Start the conversation by sending a message</Text>
                  </Stack>
                ) : (
                  <Stack spacing="xs">
                    {selectedChat.messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        onImageClick={setPreviewImage}
                      />
                    ))}
                  </Stack>
                )}
              </ScrollArea>

              {attachments.length > 0 && (
                <Paper p="md" withBorder>
                  <ScrollArea>
                    <Stack spacing="sm">
                      {attachments.map((attachment) => (
                        <AttachmentPreview
                          key={attachment.id}
                          attachment={attachment}
                          onRemove={(id) => setAttachments(prev => prev.filter(att => att.id !== id))}
                        />
                      ))}
                    </Stack>
                  </ScrollArea>
                </Paper>
              )}

              <MessageInput
                onSubmit={handleSubmit(handleSendMessage)}
                register={register}
                handleSubmit={handleSubmit}
                messageText={messageText}
                onFileSelect={handleFileSelect}
                isSubmitting={isSubmitting}
                setValue={setValue}
              />
            </>
          ) : (
            <Stack align="center" justify="center" h="100%" spacing="xs">
              <Text size="xl" weight={500} color="dimmed">Select a conversation</Text>
              <Text color="dimmed">Choose a conversation from the sidebar to start messaging</Text>
            </Stack>
          )}
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
