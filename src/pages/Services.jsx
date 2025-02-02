import { useState } from 'react';
import { Paper, Title, Button, Group, Modal, TextInput, NumberInput, Textarea, Select, Stack } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createService, getServices, updateService, deleteService } from '../api/services';
import ServicesList from '../components/ServicesList';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const queryClient = useQueryClient();

  const { data: services } = useQuery(['services'], getServices);

  const createMutation = useMutation(createService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
      setIsModalOpen(false);
      setEditingService(null);
    },
  });

  const deleteMutation = useMutation(deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <>
      <Paper p="md">
        <Group position="apart" mb="xl">
          <Title order={2}>Services</Title>
          <Button onClick={() => setIsModalOpen(true)}>Add Service</Button>
        </Group>

        <ServicesList 
          services={services} 
          onEdit={(service) => {
            setEditingService(service);
            setIsModalOpen(true);
          }}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </Paper>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        title={editingService ? "Edit Service" : "Add New Service"}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Title"
              name="title"
              required
              defaultValue={editingService?.title}
            />
            
            <Textarea
              label="Description"
              name="description"
              required
              defaultValue={editingService?.description}
            />
            
            <Select
              label="Pricing Type"
              name="pricingType"
              required
              data={[
                { value: 'fixed', label: 'Fixed Price' },
                { value: 'hourly', label: 'Hourly Rate' },
                { value: 'quote', label: 'Custom Quote' }
              ]}
              defaultValue={editingService?.pricingType}
            />
            
            <NumberInput
              label="Price"
              name="price"
              required
              defaultValue={editingService?.price}
              min={0}
              precision={2}
            />
            
            <Button type="submit" loading={createMutation.isLoading || updateMutation.isLoading}>
              {editingService ? 'Update' : 'Create'} Service
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
