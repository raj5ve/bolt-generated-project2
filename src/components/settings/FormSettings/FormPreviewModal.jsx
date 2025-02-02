import { Modal, Button, Stack, TextInput, Textarea, Select, Paper } from '@mantine/core';

export default function FormPreviewModal({ opened, onClose, form }) {
  const renderField = (field) => {
    switch (field.type) {
      case 'long_text':
        return (
          <Textarea
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            minRows={4}
          />
        );
      
      case 'email':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="email"
          />
        );
      
      case 'phone':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="tel"
          />
        );
      
      case 'url':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="url"
          />
        );
      
      case 'number':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="number"
          />
        );
      
      case 'date':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type="date"
          />
        );
      
      case 'single_choice':
        return (
          <Select
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            data={field.options?.map(opt => ({ value: opt, label: opt })) || []}
          />
        );
      
      default:
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  if (!form) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={form.name}
      size="lg"
    >
      <Paper p="md">
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing="md">
            {form.fields.map(field => renderField(field))}
            <Button type="submit" mt="md">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
}
