import { 
  Paper, 
  Stack, 
  Text, 
  Container, 
  TextInput, 
  Button, 
  Group,
  Alert,
  Code,
  CopyButton,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { IconCopy, IconAlertCircle } from '@tabler/icons-react';

export default function WhiteLabelSettings() {
  return (
    <Container size="100%" p={0}>
      <Stack spacing={30}>
        <div>
          <Text size="xl" weight={500}>White Label Settings</Text>
          <Text size="sm" color="dimmed">Configure your custom domain</Text>
        </div>

        <Paper withBorder p="xl" radius="md">
          <Stack spacing="xl">
            <TextInput
              label="Custom Domain"
              placeholder="app.yourdomain.com"
              description="Enter the domain you want to use for your professional dashboard"
            />

            <Alert icon={<IconAlertCircle size={16} />} title="DNS Configuration" color="blue">
              Add the following CNAME record to your domain's DNS settings:
              <Group spacing="xs" mt="xs">
                <Code style={{ flex: 1 }}>
                  CNAME app.yourdomain.com workwad.com
                </Code>
                <CopyButton value="CNAME app.yourdomain.com workwad.com">
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'}>
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        <IconCopy size={16} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Alert>

            <Button>
              Save Domain Settings
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
