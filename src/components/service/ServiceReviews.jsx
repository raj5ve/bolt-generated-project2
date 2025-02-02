import { Stack, Group, Avatar, Text, Rating, Paper } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';

export default function ServiceReviews({ reviews = [] }) {
  if (!reviews.length) {
    return <Text color="dimmed">No reviews yet for this service</Text>;
  }

  return (
    <Stack spacing="md">
      {reviews.map((review) => (
        <Paper key={review.id} p="md" withBorder>
          <Group position="apart" mb="xs">
            <Group>
              <Avatar 
                src={review.userAvatar} 
                radius="xl"
                color="blue"
              >
                {review.userName[0]}
              </Avatar>
              <div>
                <Text size="sm" weight={500}>
                  {review.userName}
                </Text>
                <Text size="xs" color="dimmed">
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </Text>
              </div>
            </Group>
            <Rating value={review.rating} readOnly size="sm" />
          </Group>
          <Text size="sm">{review.comment}</Text>
        </Paper>
      ))}
    </Stack>
  );
}
