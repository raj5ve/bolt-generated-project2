import { Footer, Container, Group, Text, Stack, Anchor } from '@mantine/core';

export default function PublicFooter() {
  return (
    <Footer height={120} mt={100} sx={{ borderTop: '1px solid #eee' }}>
      <Container size="xl" py="xl">
        <Stack spacing="xs">
          <Group position="apart">
            <Text size="xl" weight={700} color="blue">
              WorkWad
            </Text>
            <Group spacing="lg">
              <Anchor size="sm" color="dimmed">
                Terms of Service
              </Anchor>
              <Anchor size="sm" color="dimmed">
                Privacy Policy
              </Anchor>
              <Anchor size="sm" color="dimmed">
                Contact Us
              </Anchor>
            </Group>
          </Group>
          <Text size="sm" color="dimmed">
            © {new Date().getFullYear()} WorkWad. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Footer>
  );
}
