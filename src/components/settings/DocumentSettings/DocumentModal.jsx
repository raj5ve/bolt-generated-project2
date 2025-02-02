import { useState } from 'react';
import { 
  Stack, 
  TextInput, 
  Textarea, 
  Group, 
  Button,
  Modal
} from '@mantine/core';

export default function DocumentModal({ opened, onClose, document, onSave }) {
  const [title, setTitle] = useState(document?.title || '');
  const [content, setContent] = useState(document?.content || '');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={document ? "Edit Document" : "Create New Document"}
      size="xl"
    >
      <Stack spacing="xl">
        <TextInput
          label="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Refund Policy, Work Agreement"
        />

        <Textarea
          label="Document Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minRows={15}
          placeholder="Enter your document content here..."
        />

        <Group position="right">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onSave({ title, content });
            }}
          >
            Save Document
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
