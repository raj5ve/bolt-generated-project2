import { useState } from 'react';
import { 
  Stepper, 
  Button, 
  Group, 
  Title,
  Text,
  Box,
  Paper,
  Container,
  MediaQuery,
  useMantineTheme,
  LoadingOverlay
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getService, updateService } from '../api/services';
import BasicInfoStep from '../components/services/creation/BasicInfoStep';
import MediaStep from '../components/services/creation/MediaStep';
import PricingStep from '../components/services/creation/PricingStep';
import RequirementsStep from '../components/services/creation/RequirementsStep';

export default function EditService() {
  const { serviceId } = useParams();
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      description: '',
      category: ''
    },
    media: {
      featuredImage: null,
      gallery: [],
      documents: []
    },
    pricing: {
      pricingType: 'fixed',
      fixedPrice: 0,
      hourlyRate: 0,
      packages: [],
      enableCustomQuotes: false
    },
    requirements: {
      requirementsDescription: '',
      requirements: []
    }
  });
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  // Fetch service data
  const { data: service, isLoading, isError } = useQuery(
    ['service', serviceId],
    () => getService(serviceId),
    {
      onSuccess: (data) => {
        if (data) {
          setFormData({
            basicInfo: {
              title: data.title || '',
              description: data.description || '',
              category: data.category || ''
            },
            media: {
              featuredImage: data.featuredImage || null,
              gallery: data.gallery || [],
              documents: data.documents || []
            },
            pricing: {
              pricingType: data.pricingType || 'fixed',
              fixedPrice: data.fixedPrice || 0,
              hourlyRate: data.hourlyRate || 0,
              packages: data.packages || [],
              enableCustomQuotes: data.enableCustomQuotes || false
            },
            requirements: {
              requirementsDescription: data.requirementsDescription || '',
              requirements: data.requirements || []
            }
          });
        }
      },
      onError: () => {
        navigate('/services');
      }
    }
  );

  // Update service mutation
  const updateMutation = useMutation(
    (data) => updateService(serviceId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['services']);
        navigate('/services');
      }
    }
  );

  const nextStep = () => setActive((current) => current + 1);
  const prevStep = () => setActive((current) => current - 1);

  const handleStepSubmit = (stepData, step) => {
    setFormData(prev => ({
      ...prev,
      [step]: stepData
    }));
    nextStep();
  };

  const handleFinalSubmit = async () => {
    // Combine all form data into a single service object
    const serviceData = {
      ...formData.basicInfo,
      ...formData.media,
      ...formData.pricing,
      ...formData.requirements
    };
    updateMutation.mutate(serviceData);
  };

  const stepTitles = ['Basic Info', 'Media', 'Pricing', 'Requirements'];

  if (isLoading) {
    return (
      <Box p="md">
        <LoadingOverlay visible={true} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p="md">
        <Paper withBorder p="xl" radius="md">
          <Text align="center" color="red" size="lg">
            Service not found or an error occurred
          </Text>
          <Button
            fullWidth
            mt="md"
            onClick={() => navigate('/services')}
          >
            Back to Services
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box p="md">
      <Paper withBorder radius="md">
        <Container size="xl" p="md">
          {/* Mobile Progress Indicator */}
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Group position="apart" mb="md">
              <Title order={2} size="h3">{stepTitles[active]}</Title>
              <Text color="dimmed" size="sm">Step {active + 1} of 4</Text>
            </Group>
          </MediaQuery>

          {/* Desktop Header */}
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Title order={2} mb="xl">Edit Service</Title>
          </MediaQuery>

          {/* Desktop Stepper */}
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Stepper active={active} mb="xl">
              <Stepper.Step 
                label="Basic Info" 
                description="Service details"
              />
              <Stepper.Step 
                label="Media" 
                description="Images & files"
              />
              <Stepper.Step 
                label="Pricing" 
                description="Packages & options"
              />
              <Stepper.Step 
                label="Requirements" 
                description="Project details"
              />
            </Stepper>
          </MediaQuery>

          {/* Mobile Stepper */}
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Stepper
              active={active}
              size="sm"
              mb="md"
              styles={{
                steps: { display: 'none' },
                separator: { margin: 0 }
              }}
            />
          </MediaQuery>

          {/* Step Content */}
          <Box>
            {active === 0 && (
              <BasicInfoStep
                initialData={formData.basicInfo}
                onSubmit={(data) => handleStepSubmit(data, 'basicInfo')}
              />
            )}
            {active === 1 && (
              <MediaStep
                initialData={formData.media}
                onSubmit={(data) => handleStepSubmit(data, 'media')}
                onBack={prevStep}
              />
            )}
            {active === 2 && (
              <PricingStep
                initialData={formData.pricing}
                onSubmit={(data) => handleStepSubmit(data, 'pricing')}
                onBack={prevStep}
              />
            )}
            {active === 3 && (
              <RequirementsStep
                initialData={formData.requirements}
                onSubmit={handleFinalSubmit}
                onBack={prevStep}
                isSubmitting={updateMutation.isLoading}
              />
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
