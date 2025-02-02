import { Container, Title, Timeline, Text, ThemeIcon } from '@mantine/core';
import { 
  IconUserPlus, 
  IconSearch, 
  IconMessageDots, 
  IconCreditCard 
} from '@tabler/icons-react';

const steps = [
  {
    icon: IconUserPlus,
    title: 'Create an Account',
    description: 'Sign up for free and complete your profile'
  },
  {
    icon: IconSearch,
    title: 'Find Professionals',
    description: 'Browse profiles and reviews to find the perfect match'
  },
  {
    icon: IconMessageDots,
    title: 'Discuss Project',
    description: 'Chat with professionals to discuss your requirements'
  },
  {
    icon: IconCreditCard,
    title: 'Start Working',
    description: 'Hire and pay securely through our platform'
  }
];

export default function HowItWorks() {
  return (
    <Container size="xl" py={50}>
      <Title order={2} align="center" mb={50}>
        How WorkWad Works
      </Title>

      <Timeline active={-1} bulletSize={40} lineWidth={2}>
        {steps.map((step, index) => (
          <Timeline.Item
            key={index}
            bullet={
              <ThemeIcon
                size={40}
                radius="xl"
                color="blue"
              >
                <step.icon size={20} />
              </ThemeIcon>
            }
            title={
              <Text size="lg" weight={500}>
                {step.title}
              </Text>
            }
          >
            <Text color="dimmed" size="sm">
              {step.description}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Container>
  );
}
