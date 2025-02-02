import { Stack, TextInput, Textarea, Button, Group, Paper, ActionIcon } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function RequirementsStep({ initialData = {}, onSubmit, onBack }) {
  const [requirements, setRequirements] = useState(initialData.requirements || [
    { id: 1, question: '' }
  ]);

  const { register, handleSubmit } = useForm({
    defaultValues: initialData
  });

  const addRequirement = () => {
    setRequirements([
      ...requirements,
      { id: Date.now(), question: '' }
    ]);
  };

  const removeRequirement = (id) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      requirements
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="xl">
        <Textarea
          label="Requirements Description"
          description="Explain what you need from clients to start working"
          minRows={3}
          {...register('requirementsDescription')}
        />

        <Stack spacing="md">
          {requirements.map((req, index) => (
            <Paper key={req.id} withBorder p="md">
              <Group>
                <TextInput
                  label={`Requirement ${index + 1}`}
                  placeholder="e.g., What's your project timeline?"
                  value={req.question}
                  onChange={(e) => {
                    const newRequirements = [...requirements];
                    newRequirements[index].question = e.target.value;
                    setRequirements(newRequirements);
                  }}
                  style={{ flex: 1 }}
                />
                <ActionIcon
                  color="red"
                  onClick={() => removeRequirement(req.id)}
                  disabled={requirements.length === 1}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Paper>
          ))}

          <Button
            variant="outline"
            leftIcon={<IconPlus size={16} />}
            onClick={addRequirement}
          >
            Add Requirement
          </Button>
        </Stack>

        <Group position="apart" mt="xl">
          <Button variant="light" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" color="green">
            Create Service
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
