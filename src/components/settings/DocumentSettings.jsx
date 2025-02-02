import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  Button, 
  Group,
  TextInput,
  Textarea,
  ActionIcon,
  Modal,
  Divider
} from '@mantine/core';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';

export default function DocumentSettings() {
  const [documents, setDocuments] = useState([
    {
      id: '1',
      title: 'Refund Policy',
      content: 'Default refund policy content...'
    },
    {
      id: '2',
      title: 'Work Agreement',
      content: 'Default work agreement content...'
    }
  ]);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Group position="apart">
          <Text size="xl" weight={500}>Legal Documents</Text>
          <Button 
            leftIcon={<IconPlus size={16} />}
            onClick={() => {
              setCurrentDoc(null);
              setIsDocModalOpen(true);
            }}
          >
            Create New Document
          </Button>
        </Group>

        {documents.map((doc) => (
          <Paper key={doc.id} withBorder p="xl" radius="md">
            <Stack spacing="xl">
              <Group position="apart">
                <Text size="lg" weight={500}>{doc.title}</Text>
                <Group spacing="xs">
                  <ActionIcon 
                    variant="light"
                    onClick={() => {
                      setCurrentDoc(doc);
                      setIsDocModalOpen(true);
                    }}
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                  <ActionIcon 
                    variant="light" 
                    color="red"
                    onClick={() => {
                      setDocuments(documents.filter(d => d.id !== doc.id));
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              <Divider />

              <Text size="sm" color="dimmed" style={{ whiteSpace: 'pre-wrap' }}>
                {doc.content.length > 200 
                  ? `${doc.content.substring(0, 200)}...` 
                  : doc.content}
              </Text>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <DocumentModal
        opened={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        document={currentDoc}
        onSave={(docData) => {
          if (currentDoc) {
            setDocuments(documents.map(d => 
              d.id === currentDoc.id ? { ...docData, id: d.id } : d
            ));
          } else {
            setDocuments([...documents, { ...docData, id: String(Date.now()) }]);
          }
          setIsDocModalOpen(false);
        }}
      />
    </Container>
  );
}

function DocumentModal({ opened, onClose, document, onSave }) {
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
