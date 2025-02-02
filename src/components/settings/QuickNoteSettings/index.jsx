import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  Button, 
  Group,
  ActionIcon,
  Divider
} from '@mantine/core';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import QuickNoteModal from './QuickNoteModal';

export default function QuickNoteSettings() {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Project Requirements Template',
      content: 'Please provide the following details:\n1. Project scope\n2. Timeline\n3. Budget\n4. Specific requirements'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Group position="apart">
          <div>
            <Text size="xl" weight={500}>Quick Notes</Text>
            <Text size="sm" color="dimmed">Create reusable notes for quick access in messages</Text>
          </div>
          <Button 
            leftIcon={<IconPlus size={16} />}
            onClick={() => {
              setCurrentNote(null);
              setIsModalOpen(true);
            }}
          >
            Add New Note
          </Button>
        </Group>

        {notes.map((note) => (
          <Paper key={note.id} withBorder p="xl" radius="md">
            <Stack spacing="xl">
              <Group position="apart">
                <Text size="lg" weight={500}>{note.title}</Text>
                <Group spacing="xs">
                  <ActionIcon 
                    variant="light"
                    onClick={() => {
                      setCurrentNote(note);
                      setIsModalOpen(true);
                    }}
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                  <ActionIcon 
                    variant="light" 
                    color="red"
                    onClick={() => {
                      setNotes(notes.filter(n => n.id !== note.id));
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              <Divider />

              <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                {note.content.length > 200 
                  ? `${note.content.substring(0, 200)}...` 
                  : note.content}
              </Text>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <QuickNoteModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={currentNote}
        onSave={(noteData) => {
          if (currentNote) {
            setNotes(notes.map(n => 
              n.id === currentNote.id ? { ...noteData, id: n.id } : n
            ));
          } else {
            setNotes([...notes, { ...noteData, id: String(Date.now()) }]);
          }
          setIsModalOpen(false);
        }}
      />
    </Container>
  );
}
