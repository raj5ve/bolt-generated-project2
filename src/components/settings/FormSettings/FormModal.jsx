import { useState } from 'react';
import { 
  Stack, 
  TextInput, 
  Group, 
  Button, 
  ActionIcon, 
  Switch,
  Text,
  Modal,
  Select,
  Paper,
  Divider
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'select', label: 'Dropdown' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' }
];

export default function FormModal({ opened, onClose, form, onSave }) {
  const [formName, setFormName] = useState(form?.name || '');
  const [fields, setFields] = useState(form?.fields || [
    { 
      id: '1',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      required: true 
    }
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type: 'text',
        label: '',
        placeholder: '',
        required: false,
        options: []
      }
    ]);
  };

  const updateField = (id, updates) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

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
          placeholder="e.g., Contact Form, Project Brief"
          required
        />

        <div>
          <Text weight={500} mb="md">Form Fields</Text>
          <Stack spacing="md">
            {fields.map((field, index) => (
              <Paper key={field.id} withBorder p="md">
                <Stack spacing="md">
                  <Group position="apart">
                    <Text size="sm" weight={500}>Field {index + 1}</Text>
                    <ActionIcon 
                      color="red" 
                      onClick={() => removeField(field.id)}
                      disabled={fields.length === 1}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>

                  <Select
                    label="Field Type"
                    value={field.type}
                    onChange={(value) => updateField(field.id, { type: value })}
                    data={FIELD_TYPES}
                  />

                  <TextInput
                    label="Field Label"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    placeholder="e.g., Full Name, Email Address"
                  />

                  <TextInput
                    label="Placeholder"
                    value={field.placeholder}
                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    placeholder="e.g., Enter your full name"
                  />

                  {field.type === 'select' && (
                    <TextInput
                      label="Options"
                      placeholder="Comma-separated options"
                      value={field.options?.join(', ') || ''}
                      onChange={(e) => updateField(field.id, { 
                        options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                      })}
                      description="Enter options separated by commas"
                    />
                  )}

                  <Switch
                    label="Required field"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.currentTarget.checked })}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Button
            variant="light"
            leftIcon={<IconPlus size={16} />}
            onClick={addField}
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
