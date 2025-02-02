import { useState } from 'react';
import { 
  Stack, 
  TextInput, 
  Textarea, 
  Group, 
  Button,
  Modal
} from '@mantine/core';

export default function QuickNoteModal({ opened, onClose, note, onSave }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={note ? "Edit Quick Note" : "Create Quick Note"}
      size="lg"
    >
      <Stack spacing="xl">
        <TextInput
          label="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Project Requirements Template"
        />

        <Textarea
          label="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minRows={10}
          placeholder="Enter your note content here..."
        />

        <Group position="right">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onSave({ title, content });
            }}
          >
            Save Note
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
