import { 
  Modal, 
  Stack, 
  TextInput, 
  Textarea, 
  Button, 
  Group,
  Text,
  Paper,
  FileButton
} from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function OrderCompletionForm({ opened, onClose, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [workSummary, setWorkSummary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      files,
      notes,
      workSummary,
      completedAt: new Date().toISOString()
    });
  };

  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Complete Order"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <div>
            <Text weight={500} size="sm" mb="xs">Work Summary</Text>
            <Textarea
              placeholder="Provide a summary of the work completed..."
              minRows={3}
              value={workSummary}
              onChange={(e) => setWorkSummary(e.target.value)}
              required
            />
          </div>

          <div>
            <Text weight={500} size="sm" mb="xs">Additional Notes</Text>
            <Textarea
              placeholder="Any additional notes or instructions for the client..."
              minRows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div>
            <Text weight={500} size="sm" mb="xs">Proof of Work</Text>
            <Group mb="md">
              <FileButton
                onChange={handleFileSelect}
                accept="image/*,application/pdf,.doc,.docx,.zip"
                multiple
              >
                {(props) => (
                  <Button {...props} leftIcon={<IconUpload size={14} />}>
                    Upload Files
                  </Button>
                )}
              </FileButton>
              <Text size="xs" color="dimmed">
                Upload completed work files, screenshots, or documentation
              </Text>
            </Group>

            <Stack spacing="xs">
              {files.map((file) => (
                <Paper key={file.id} p="xs" withBorder>
                  <Group position="apart">
                    <div>
                      <Text size="sm">{file.name}</Text>
                      <Text size="xs" color="dimmed">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </div>
                    <Button
                      size="xs"
                      color="red"
                      variant="subtle"
                      onClick={() => removeFile(file.id)}
                    >
                      <IconX size={14} />
                    </Button>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </div>

          <Group position="right" mt="md">
            <Button variant="light" onClick={onClose}>Cancel</Button>
            <Button type="submit" color="green">
              Complete Order
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
