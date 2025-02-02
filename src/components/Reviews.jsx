import { Paper, Text, Group, Avatar, Rating, Stack, SimpleGrid } from '@mantine/core';

export default function Reviews({ reviews = [] }) {
  if (!reviews?.length) {
    return <Text color="dimmed">No reviews yet</Text>;
  }

  return (
    <SimpleGrid
      cols={2}
      spacing="md"
      breakpoints={[
        { maxWidth: 'sm', cols: 1 }
      ]}
    >
      {reviews.map((review) => (
        <Paper key={review.id} p="md" withBorder>
          <Stack spacing="md">
            <Group position="apart">
              <Group>
                <Avatar color="blue" radius="xl">
                  {review.name[0]}
                </Avatar>
                <div>
                  <Text size="sm" weight={500}>
                    {review.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {review.date}
                  </Text>
                </div>
              </Group>
              <Rating value={review.rating} readOnly size="sm" />
            </Group>
            <Text size="sm">{review.comment}</Text>
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
