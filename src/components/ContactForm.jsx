import { TextInput, Textarea, Button, Stack, Select } from '@mantine/core';
import { useForm } from 'react-hook-form';

export default function ContactForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    console.log('Contact form data:', data);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="md">
        <TextInput
          label="Your Name"
          placeholder="Enter your name"
          required
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
        />
        
        <Select
          label="Subject"
          placeholder="Select a subject"
          required
          data={[
            { value: 'project', label: 'Project Inquiry' },
            { value: 'question', label: 'General Question' },
            { value: 'other', label: 'Other' }
          ]}
          {...register('subject', { required: 'Subject is required' })}
          error={errors.subject?.message}
        />
        
        <Textarea
          label="Message"
          placeholder="Your message here..."
          required
          minRows={4}
          {...register('message', { required: 'Message is required' })}
          error={errors.message?.message}
        />
        
        <Button type="submit" size="md">
          Send Message
        </Button>
      </Stack>
    </form>
  );
}
