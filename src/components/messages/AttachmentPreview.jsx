import { Paper, Group, Box, Text, ActionIcon, Progress, Image } from '@mantine/core';
import { IconFile, IconPhoto, IconX, IconDownload } from '@tabler/icons-react';

const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return IconPhoto;
  return IconFile;
};

export default function AttachmentPreview({ 
  attachment, 
  inMessage = false, 
  onRemove,
  onImageClick 
}) {
  const Icon = getFileIcon(attachment.type);
  
  if (attachment.type.startsWith('image/')) {
    return (
      <Box 
        sx={{ position: 'relative', maxWidth: 200, cursor: inMessage ? 'pointer' : 'default' }}
        onClick={() => inMessage && onImageClick?.()}
      >
        <Image
          src={inMessage ? attachment.url : URL.createObjectURL(attachment.file)}
          radius="md"
          alt={inMessage ? attachment.name : attachment.file.name}
          withPlaceholder
        />
        {!inMessage && onRemove && (
          <ActionIcon
            color="red"
            variant="filled"
            size="xs"
            sx={{ position: 'absolute', top: 5, right: 5 }}
            onClick={() => onRemove(attachment.id)}
          >
            <IconX size={12} />
          </ActionIcon>
        )}
      </Box>
    );
  }

  return (
    <Paper withBorder p="xs" sx={{ maxWidth: 250 }}>
      <Group spacing="sm">
        <Icon size={24} />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" lineClamp={1}>
            {inMessage ? attachment.name : attachment.file.name}
          </Text>
          <Text size="xs" color="dimmed">
            {(inMessage ? attachment.size : attachment.file.size) / 1024 > 1024
              ? `${((inMessage ? attachment.size : attachment.file.size) / 1024 / 1024).toFixed(2)} MB`
              : `${((inMessage ? attachment.size : attachment.file.size) / 1024).toFixed(2)} KB`}
          </Text>
        </Box>
        {!inMessage && onRemove ? (
          <ActionIcon color="red" onClick={() => onRemove(attachment.id)}>
            <IconX size={16} />
          </ActionIcon>
        ) : (
          <ActionIcon component="a" href={attachment.url} download>
            <IconDownload size={16} />
          </ActionIcon>
        )}
      </Group>
      {!inMessage && attachment.progress < 100 && (
        <Progress 
          value={attachment.progress} 
          size="xs" 
          mt="xs" 
          color={attachment.progress === 100 ? 'green' : 'blue'}
        />
      )}
    </Paper>
  );
}
