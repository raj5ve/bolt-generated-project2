import { Card, Text, Group, Stack, Button, Badge, SimpleGrid } from '@mantine/core';

export default function ServicePackages({ packages }) {
  if (!packages?.length) {
    return (
      <Card withBorder p="xl" radius="md">
        <Stack align="center" spacing="xs">
          <Text size="lg" weight={500}>Custom Quote</Text>
          <Text color="dimmed" align="center">
            This service requires custom pricing. Contact the freelancer for a quote.
          </Text>
          <Button mt="md">Request Quote</Button>
        </Stack>
      </Card>
    );
  }

  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {packages.map((pkg) => (
        <Card key={pkg.id} withBorder radius="md" p="xl">
          <Stack spacing="xl">
            <Stack spacing="xs">
              <Text size="lg" weight={500}>{pkg.name}</Text>
              <Text size="xl" weight={700}>
                ${pkg.price}
              </Text>
              <Badge color="blue">
                {pkg.deliveryTime} delivery
              </Badge>
            </Stack>

            <Stack spacing="xs">
              {pkg.features?.map((feature, index) => (
                <Group key={index} spacing="xs">
                  <Text size="sm">•</Text>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </Stack>

            <Button fullWidth>
              Select {pkg.name}
            </Button>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
