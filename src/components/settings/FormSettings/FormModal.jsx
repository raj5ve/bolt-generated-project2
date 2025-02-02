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
  Tooltip,
  Paper,
  Divider
} from '@mantine/core';
import { IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react';

const FIELD_TYPES = [
  { value: 'short_text', label: 'Short Text' },
  { value: 'long_text', label: 'Long Text' },
  { value: 'email', label: 'Email Address' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'url', label: 'URL' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'single_choice', label: 'Single Choice' },
  { value: 'multiple_choice', label: 'Multiple Choice' }
];

const getFieldTypeLabel = (type) => {
  return FIELD_TYPES.find(t => t.value === type)?.label || type;
};

const getFieldPlaceholder = (type) => {
  switch (type) {
    case 'email':
      return 'Enter your email address';
    case 'phone':
      return 'Enter your phone number';
    case 'url':
      return 'Enter website URL';
    case 'long_text':
      return 'Enter your message';
    case 'number':
      return 'Enter a number';
    case 'date':
      return 'Select a date';
    default:
      return 'Enter your answer';
  }
};

export default function FormModal({ opened, onClose, form, onSave }) {
  const [fields, setFields] = useState(form?.fields || [
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
    }
  ]);
  const [formName, setFormName] = useState(form?.name || '');

  const addField = () => {
    setFields([
      ...fields, 
      {
        id: Date.now().toString(),
        type: 'short_text',
        label: '',
        placeholder: '',
        required: false,
        options: [] // for single/multiple choice fields
      }
    ]);
  };

  const updateField = (id, updates) => {
    setFields(fields.map(field => {
      if (field.id === id) {
        const updatedField = { ...field, ...updates };
        // Update placeholder when type changes
        if (updates.type) {
          updatedField.placeholder = getFieldPlaceholder(updates.type);
        }
        return updatedField;
      }
      return field;
    }));
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const moveField = (fromIndex, toIndex) => {
    const newFields = [...fields];
    const [removed] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, removed);
    setFields(newFields);
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
          required
          placeholder="e.g., Contact Form, Project Brief"
        />

        <div>
          <Text weight={500} mb="md">Form Fields</Text>
          <Stack spacing="md">
            {fields.map((field, index) => (
              <Paper key={field.id} withBorder p="md">
                <Stack spacing="md">
                  <Group position="apart">
                    <Group spacing="xs">
                      <Tooltip label="Drag to reorder">
                        <ActionIcon size="sm" color="gray">
                          <IconGripVertical size={14} />
                        </ActionIcon>
                      </Tooltip>
                      <Text size="sm" weight={500}>Field {index + 1}</Text>
                    </Group>
                    <ActionIcon 
                      color="red" 
                      onClick={() => removeField(field.id)}
                      disabled={fields.length <= 1}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>

                  <Divider />

                  <Group grow align="flex-start">
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
                      placeholder={`e.g., ${getFieldTypeLabel(field.type)}`}
                    />
                  </Group>

                  <TextInput
                    label="Placeholder Text"
                    value={field.placeholder}
                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    placeholder={getFieldPlaceholder(field.type)}
                  />

                  {(field.type === 'single_choice' || field.type === 'multiple_choice') && (
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
