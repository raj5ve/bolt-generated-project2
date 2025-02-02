import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  Button, 
  Group, 
  ActionIcon,
  Divider,
  Code,
  Tooltip,
  Badge
} from '@mantine/core';
import { IconPlus, IconCopy, IconPencil, IconTrash, IconEye } from '@tabler/icons-react';
import FormModal from './FormModal';
import FormPreviewModal from './FormPreviewModal';

const EMBED_CODE_TEMPLATE = (formId) => `
<iframe 
  src="https://freelancebase.com/forms/${formId}" 
  width="100%" 
  height="500px" 
  frameborder="0"
></iframe>
`;

export default function FormSettings() {
  const [forms, setForms] = useState([
    {
      id: '1',
      name: 'Contact Form',
      fields: [
        { 
          id: '1',
          type: 'short_text',
          label: 'Name',
          placeholder: 'Enter your name',
          required: true 
        },
        { 
          id: '2',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          required: true 
        },
        {
          id: '3',
          type: 'phone',
          label: 'Phone',
          placeholder: 'Enter your phone number',
          required: false
        },
        {
          id: '4',
          type: 'long_text',
          label: 'Message',
          placeholder: 'Enter your message',
          required: true
        }
      ],
      active: true
    }
  ]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const handleCopyCode = (formId) => {
    navigator.clipboard.writeText(EMBED_CODE_TEMPLATE(formId));
  };

  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Group position="apart">
          <div>
            <Text size="xl" weight={500}>Lead Generation Forms</Text>
            <Text size="sm" color="dimmed">Create and manage your lead generation forms</Text>
          </div>
          <Button 
            leftIcon={<IconPlus size={16} />}
            onClick={() => {
              setCurrentForm(null);
              setIsFormModalOpen(true);
            }}
          >
            Create New Form
          </Button>
        </Group>

        {forms.map((form) => (
          <Paper key={form.id} withBorder p="xl" radius="md">
            <Stack spacing="xl">
              <Group position="apart">
                <div>
                  <Group spacing="xs" align="center">
                    <Text size="lg" weight={500}>{form.name}</Text>
                    <Badge 
                      color={form.active ? 'green' : 'gray'}
                      variant="light"
                    >
                      {form.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Group>
                  <Text size="sm" color="dimmed" mt={4}>
                    {form.fields.length} fields
                  </Text>
                </div>
                <Group spacing="xs">
                  <Tooltip label="Preview Form">
                    <ActionIcon 
                      variant="light"
                      onClick={() => {
                        setCurrentForm(form);
                        setIsPreviewModalOpen(true);
                      }}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Edit Form">
                    <ActionIcon 
                      variant="light"
                      onClick={() => {
                        setCurrentForm(form);
                        setIsFormModalOpen(true);
                      }}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Delete Form">
                    <ActionIcon 
                      variant="light" 
                      color="red"
                      onClick={() => {
                        setForms(forms.filter(f => f.id !== form.id));
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>

              <Divider />

              <Stack spacing="md">
                <Text weight={500}>Fields</Text>
                <Stack spacing="xs">
                  {form.fields.map((field, index) => (
                    <Group key={field.id} position="apart">
                      <Group spacing="xs">
                        <Text size="sm" color="dimmed">{index + 1}.</Text>
                        <Text size="sm">{field.label}</Text>
                        {field.required && (
                          <Badge size="xs" variant="dot" color="red">Required</Badge>
                        )}
                      </Group>
                      <Badge size="sm">{field.type.replace('_', ' ').toUpperCase()}</Badge>
                    </Group>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing="md">
                <Text weight={500}>Embed Code</Text>
                <Group spacing="xs">
                  <Code block style={{ flex: 1 }}>
                    {EMBED_CODE_TEMPLATE(form.id)}
                  </Code>
                  <Tooltip label="Copy embed code">
                    <ActionIcon 
                      variant="light"
                      onClick={() => handleCopyCode(form.id)}
                    >
                      <IconCopy size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <FormModal
        opened={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setCurrentForm(null);
        }}
        form={currentForm}
        onSave={(formData) => {
          if (currentForm) {
            setForms(forms.map(f => 
              f.id === currentForm.id ? { ...formData, id: f.id } : f
            ));
          } else {
            setForms([...forms, { ...formData, id: String(Date.now()) }]);
          }
          setIsFormModalOpen(false);
          setCurrentForm(null);
        }}
      />

      <FormPreviewModal
        opened={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setCurrentForm(null);
        }}
        form={currentForm}
      />
    </Container>
  );
}
