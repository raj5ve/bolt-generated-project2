import { Paper, Title, Button, Group, Text, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServices, deleteService } from '../api/services';
import ServiceCard from '../components/services/ServiceCard';

export default function ServiceListing() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: services = [] } = useQuery(['services'], getServices);

  const deleteMutation = useMutation(deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
    }
  });

  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <Paper p="md" radius={0}>
      <Group position="apart" mb="xl">
        <Title order={2}>Your Services</Title>
        <Button onClick={() => navigate('/services/create')}>Add New Service</Button>
      </Group>

      <Stack spacing="md">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            service={service}
            onDelete={() => handleDelete(service.id)}
          />
        ))}

        {services.length === 0 && (
          <Text color="dimmed" align="center" py="xl">
            No services listed yet. Click "Add New Service" to create one.
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
