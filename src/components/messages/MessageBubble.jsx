import { Paper, Text, Box } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';
import AttachmentPreview from './AttachmentPreview';

export default function MessageBubble({ message, onImageClick }) {
  // Function to preserve line breaks
  const formatMessageContent = (content) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index !== content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Paper
      p="md"
      withBorder
      sx={(theme) => ({
        maxWidth: '70%',
        marginLeft: message.isSender ? 'auto' : 0,
        backgroundColor: message.isSender ? theme.colors.blue[0] : 'white',
        borderRadius: message.isSender ? '12px 12px 0 12px' : '12px 12px 12px 0'
      })}
    >
      {message.content && (
        <Text 
          size="sm" 
          mb={message.attachments?.length ? 'xs' : 0}
          sx={{ whiteSpace: 'pre-wrap' }} // This preserves line breaks
        >
          {formatMessageContent(message.content)}
        </Text>
      )}
      
      {message.attachments?.length > 0 && (
        <Box mt={message.content ? 'xs' : 0}>
          {message.attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              attachment={attachment}
              inMessage
              onImageClick={() => onImageClick(attachment)}
            />
          ))}
        </Box>
      )}
      
      <Text size="xs" color="dimmed" align={message.isSender ? 'right' : 'left'} mt={4}>
        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
      </Text>
    </Paper>
  );
}
