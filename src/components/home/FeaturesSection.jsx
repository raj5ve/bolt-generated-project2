import { Container, SimpleGrid, Paper, Text, ThemeIcon, Stack } from '@mantine/core';
import { 
  IconBriefcase, 
  IconMessage, 
  IconCreditCard, 
  IconShield, 
  IconClock, 
  IconReportMoney 
} from '@tabler/icons-react';

const features = [
  {
    icon: IconBriefcase,
    title: 'Professional Talent',
    description: 'Access a global network of skilled professionals ready to help with your projects'
  },
  {
    icon: IconMessage,
    title: 'Easy Communication',
    description: 'Built-in messaging system for seamless collaboration with professionals'
  },
  {
    icon: IconCreditCard,
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with milestone-based releases'
  },
  {
    icon: IconShield,
    title: 'Work Protection',
    description: 'Escrow system ensures quality delivery before payment release'
  },
  {
    icon: IconClock,
    title: 'Time Tracking',
    description: 'Built-in time tracking for hourly projects with automatic billing'
  },
  {
    icon: IconReportMoney,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no hidden charges or surprise fees'
  }
];

export default function FeaturesSection() {
  return (
    <Container size="xl" py={50}>
      <SimpleGrid
        cols={3}
        spacing={30}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
      >
        {features.map((feature, index) => (
          <Paper key={index} p="xl" radius="md" withBorder>
            <Stack>
              <ThemeIcon
                size={44}
                radius="md"
                variant="light"
                color="blue"
              >
                <feature.icon size={24} />
              </ThemeIcon>

              <Text size="lg" weight={500}>
                {feature.title}
              </Text>

              <Text size="sm" color="dimmed">
                {feature.description}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}
