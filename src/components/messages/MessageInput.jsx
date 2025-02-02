import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Group, 
  ActionIcon, 
  Menu, 
  FileButton, 
  Button, 
  Textarea,
  Modal,
  Text
} from '@mantine/core';
import { 
  IconPaperclip, 
  IconPhoto, 
  IconFile, 
  IconSend,
  IconNotes
} from '@tabler/icons-react';

// Mock quick notes data - In real app, this would come from your state management
const mockQuickNotes = [
  {
    id: '1',
    title: 'Project Requirements Template',
    content: 'Please provide the following details:\n1. Project scope\n2. Timeline\n3. Budget\n4. Specific requirements'
  },
  {
    id: '2',
    title: 'Meeting Schedule Request',
    content: 'Would you like to schedule a meeting to discuss the project details?\nPlease let me know your preferred:\n- Time slots\n- Timezone\n- Meeting platform'
  }
];

export default function MessageInput({ 
  onSubmit, 
  register, 
  handleSubmit, 
  messageText, 
  onFileSelect,
  isSubmitting = false,
  setValue
}) {
  const [isQuickNotesOpen, setIsQuickNotesOpen] = useState(false);

  const handleQuickNoteSelect = (content) => {
    setValue('message', content);
    setIsQuickNotesOpen(false);
  };

  return (
    <>
      <Paper p="md" withBorder>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="xs">
            <Textarea
              placeholder="Type your message..."
              minRows={2}
              maxRows={6}
              autosize
              {...register('message')}
              styles={{
                input: {
                  lineHeight: 1.5,
                }
              }}
            />
            <Group position="apart">
              <Group spacing="xs">
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon 
                      variant="light"
                      color="gray"
                      size="lg"
                      title="Add attachment"
                    >
                      <IconPaperclip size={20} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Add attachment</Menu.Label>
                    <Menu.Item
                      icon={<IconPhoto size={14} />}
                      closeMenuOnClick={false}
                    >
                      <FileButton
                        onChange={onFileSelect}
                        accept="image/*"
                        multiple
                      >
                        {(props) => (
                          <div {...props} style={{ cursor: 'pointer' }}>
                            Images
                          </div>
                        )}
                      </FileButton>
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconFile size={14} />}
                      closeMenuOnClick={false}
                    >
                      <FileButton
                        onChange={onFileSelect}
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                      >
                        {(props) => (
                          <div {...props} style={{ cursor: 'pointer' }}>
                            Documents
                          </div>
                        )}
                      </FileButton>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <ActionIcon 
                  variant="light"
                  color="gray"
                  size="lg"
                  title="Insert Quick Note"
                  onClick={() => setIsQuickNotesOpen(true)}
                >
                  <IconNotes size={20} />
                </ActionIcon>
              </Group>
              <Button 
                type="submit"
                rightIcon={<IconSend size={16} />}
                disabled={!messageText.trim()}
                loading={isSubmitting}
              >
                Send
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>

      <Modal
        opened={isQuickNotesOpen}
        onClose={() => setIsQuickNotesOpen(false)}
        title="Quick Notes"
        size="lg"
      >
        <Stack spacing="md">
          {mockQuickNotes.map((note) => (
            <Paper 
              key={note.id} 
              withBorder 
              p="md"
              sx={(theme) => ({
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.colors.gray[0]
                }
              })}
              onClick={() => handleQuickNoteSelect(note.content)}
            >
              <Text weight={500} mb="xs">{note.title}</Text>
              <Text size="sm" color="dimmed" sx={{ whiteSpace: 'pre-line' }}>
                {note.content}
              </Text>
            </Paper>
          ))}
          {mockQuickNotes.length === 0 && (
            <Text color="dimmed" align="center">
              No quick notes available. Create them in Settings → Quick Notes.
            </Text>
          )}
        </Stack>
      </Modal>
    </>
  );
}
