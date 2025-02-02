import { Paper, Stack, TextInput, Textarea, Select, Text } from '@mantine/core';

export default function FormPreview({ field }) {
  const renderField = () => {
    switch (field.type) {
      case 'long_text':
        return (
          <Textarea
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            minRows={4}
          />
        );
      
      case 'email':
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="email"
          />
        );
      
      case 'phone':
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="tel"
          />
        );
      
      case 'url':
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="url"
          />
        );
      
      case 'number':
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="number"
          />
        );
      
      case 'date':
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="date"
          />
        );
      
      case 'single_choice':
        return (
          <Select
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            data={field.options?.map(opt => ({ value: opt, label: opt })) || []}
          />
        );
      
      default:
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <Paper p="md" withBorder>
      <Stack spacing="md">
        <Text size="sm" weight={500}>Preview:</Text>
        {renderField()}
      </Stack>
    </Paper>
  );
}
