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
  useMantineTheme
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import BasicInfoStep from '../components/services/creation/BasicInfoStep';
import MediaStep from '../components/services/creation/MediaStep';
import PricingStep from '../components/services/creation/PricingStep';
import RequirementsStep from '../components/services/creation/RequirementsStep';
import Layout from '../components/Layout';

export default function CreateService() {
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    media: {
      featuredImage: null,
      gallery: [],
      documents: []
    },
    pricing: {},
    requirements: {}
  });
  const navigate = useNavigate();
  const theme = useMantineTheme();

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
    console.log('Final form data:', formData);
    navigate('/services');
  };

  const stepTitles = ['Basic Info', 'Media', 'Pricing', 'Requirements'];

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
            <Title order={2} mb="xl">Create New Service</Title>
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
              />
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
