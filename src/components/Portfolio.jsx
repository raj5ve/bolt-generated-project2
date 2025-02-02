import { SimpleGrid, Card, Image, Text, Badge, Group, Stack } from '@mantine/core';

export default function Portfolio({ items = [] }) {
  if (!items?.length) {
    return <Text color="dimmed">No portfolio items yet</Text>;
  }

  return (
    <SimpleGrid
      cols={2}
      spacing="md"
      breakpoints={[
        { maxWidth: 'sm', cols: 1 }
      ]}
    >
      {items.map((item) => (
        <Card key={item.id} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={item.image}
              height={160}
              alt={item.title}
            />
          </Card.Section>

          <Stack spacing="xs" mt="md">
            <Text weight={500} size="lg">
              {item.title}
            </Text>

            <Text size="sm" color="dimmed">
              {item.description}
            </Text>

            <Group spacing={5}>
              {item.tags.map((tag) => (
                <Badge key={tag} size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
