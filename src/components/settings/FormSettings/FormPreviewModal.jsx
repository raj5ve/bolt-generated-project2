import { Modal, Button, Stack, TextInput, Textarea, Select } from '@mantine/core';

export default function FormPreviewModal({ opened, onClose, form }) {
  if (!form) return null;

  const renderField = (field) => {
    switch (field.type) {
      case 'textarea':
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
      
      case 'select':
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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={form.name}
      size="lg"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack spacing="md">
          {form.fields.map(field => renderField(field))}
          <Button type="submit" mt="md">
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
