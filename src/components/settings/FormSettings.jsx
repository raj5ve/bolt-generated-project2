import { useState } from 'react';
import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  Button, 
  Group, 
  TextInput,
  Switch,
  Code,
  Tooltip,
  ActionIcon,
  Modal,
  Divider
} from '@mantine/core';
import { IconPlus, IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';

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
        { type: 'text', label: 'Name', required: true },
        { type: 'email', label: 'Email', required: true },
        { type: 'text', label: 'Subject', required: true },
        { type: 'textarea', label: 'Message', required: true }
      ],
      active: true
    }
  ]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const handleCopyCode = (formId) => {
    navigator.clipboard.writeText(EMBED_CODE_TEMPLATE(formId));
  };

  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <Group position="apart">
          <Text size="xl" weight={500}>Lead Generation Forms</Text>
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
                  <Text size="lg" weight={500}>{form.name}</Text>
                  <Text size="sm" color="dimmed">
                    {form.fields.length} fields
                  </Text>
                </div>
                <Group spacing="xs">
                  <Switch
                    checked={form.active}
                    label="Active"
                    onChange={() => {
                      setForms(forms.map(f => 
                        f.id === form.id ? { ...f, active: !f.active } : f
                      ));
                    }}
                  />
                  <ActionIcon 
                    variant="light"
                    onClick={() => {
                      setCurrentForm(form);
                      setIsFormModalOpen(true);
                    }}
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                  <ActionIcon 
                    variant="light" 
                    color="red"
                    onClick={() => {
                      setForms(forms.filter(f => f.id !== form.id));
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>

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
        onClose={() => setIsFormModalOpen(false)}
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
        }}
      />
    </Container>
  );
}

function FormModal({ opened, onClose, form, onSave }) {
  const [fields, setFields] = useState(form?.fields || [
    { type: 'text', label: 'Name', required: true },
    { type: 'email', label: 'Email', required: true }
  ]);
  const [formName, setFormName] = useState(form?.name || '');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={form ? "Edit Form" : "Create New Form"}
      size="lg"
    >
      <Stack spacing="xl">
        <TextInput
          label="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          required
        />

        <div>
          <Text weight={500} mb="md">Form Fields</Text>
          <Stack spacing="md">
            {fields.map((field, index) => (
              <Group key={index} grow>
                <TextInput
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].label = e.target.value;
                    setFields(newFields);
                  }}
                  placeholder="Field Label"
                />
                <Group spacing="xs">
                  <Switch
                    checked={field.required}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].required = e.currentTarget.checked;
                      setFields(newFields);
                    }}
                    label="Required"
                  />
                  <ActionIcon 
                    color="red" 
                    onClick={() => {
                      setFields(fields.filter((_, i) => i !== index));
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>

          <Button
            variant="light"
            leftIcon={<IconPlus size={16} />}
            onClick={() => {
              setFields([...fields, { type: 'text', label: '', required: false }]);
            }}
            mt="md"
            fullWidth
          >
            Add Field
          </Button>
        </div>

        <Group position="right">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onSave({
                name: formName,
                fields,
                active: form?.active ?? true
              });
            }}
          >
            Save Form
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
