import { TextInput, Textarea, Select, Stack, Button, Box } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { useMantineTheme } from '@mantine/core';

const categories = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'video', label: 'Video & Animation' },
  { value: 'music', label: 'Music & Audio' },
  { value: 'business', label: 'Business' }
];

export default function BasicInfoStep({ initialData = {}, onSubmit }) {
  const theme = useMantineTheme();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      category: initialData.category || ''
    }
  });

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="md">
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextInput
                label="Service Title"
                placeholder="e.g., Professional Web Development"
                required
                error={errors.title?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <Textarea
                label="Description"
                placeholder="Describe your service in detail"
                minRows={4}
                required
                error={errors.description?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select
                label="Category"
                placeholder="Select a category"
                data={categories}
                required
                error={errors.category?.message}
                {...field}
                searchable
                nothingFound="No options"
              />
            )}
          />

          <Button 
            type="submit"
            mt="xl"
            fullWidth={theme.fn.smallerThan('sm')}
          >
            Next Step
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
