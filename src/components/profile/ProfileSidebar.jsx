import { Paper, Text, Button, Avatar, Group, Stack, Badge, Divider, ActionIcon } from '@mantine/core';
import { 
  IconMail, 
  IconMapPin, 
  IconClock, 
  IconStar, 
  IconMessage,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandDribbble,
  IconWorld
} from '@tabler/icons-react';

export default function ProfileSidebar({ profile, onContact }) {
  const getAverageRating = () => {
    if (!profile.reviews?.length) return 0;
    const total = profile.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / profile.reviews.length).toFixed(1);
  };

  return (
    <Paper withBorder p="xl" radius="md" sx={{ position: 'sticky', top: '1rem' }}>
      <Stack spacing="xl">
        {/* Profile Header */}
        <Stack spacing="md" align="center">
          <Avatar 
            size={120} 
            radius={120} 
            src={profile?.avatar}
            color="blue"
          >
            {profile?.name?.[0]}
          </Avatar>
          <div style={{ textAlign: 'center' }}>
            <Text size="xl" weight={700}>
              {profile?.name}
            </Text>
            <Text size="lg" color="dimmed">
              {profile?.title}
            </Text>
          </div>
        </Stack>

        <Divider />

        {/* Stats */}
        <Group grow>
          <Stack align="center" spacing={5}>
            <Group spacing={4}>
              <IconStar size={16} color="#FFB800"/>
              <Text weight={700}>{getAverageRating()}</Text>
            </Group>
            <Text size="xs" color="dimmed">Average Rating</Text>
          </Stack>
          <Stack align="center" spacing={5}>
            <Group spacing={4}>
              <IconMessage size={16} />
              <Text weight={700}>{profile.reviews?.length || 0}</Text>
            </Group>
            <Text size="xs" color="dimmed">Reviews</Text>
          </Stack>
        </Group>

        <Divider />

        {/* Status and Rate */}
        <Group position="apart">
          <Badge size="lg" color="green">Available for work</Badge>
          <Badge size="lg" variant="outline">
            ${profile?.hourlyRate}/hour
          </Badge>
        </Group>

        {/* Location and Response Time */}
        <Stack spacing="xs">
          <Group spacing="xs">
            <IconMapPin size={16} color="gray" />
            <Text size="sm" color="dimmed">
              {profile?.location}
            </Text>
          </Group>
          <Group spacing="xs">
            <IconClock size={16} color="gray" />
            <Text size="sm" color="dimmed">
              Usually responds in 24 hours
            </Text>
          </Group>
        </Stack>

        <Divider />

        {/* Skills */}
        <div>
          <Text weight={500} size="sm" mb="xs">Skills</Text>
          <Group spacing="xs">
            {profile.skills?.map((skill, index) => (
              <Badge 
                key={index}
                variant="outline"
                size="sm"
              >
                {skill}
              </Badge>
            ))}
          </Group>
        </div>

        <Divider />

        {/* Bio */}
        <div>
          <Text weight={500} size="lg" mb="xs">About Me</Text>
          <Text size="sm" color="dimmed">
            {profile?.bio}
          </Text>
        </div>

        <Button 
          fullWidth 
          size="md"
          leftIcon={<IconMail size={16} />}
          onClick={onContact}
        >
          Get in Touch
        </Button>

        {/* Social Links */}
        {profile.social && (
          <Group position="center" spacing="md">
            {profile.social.github && (
              <ActionIcon 
                component="a"
                href={profile.social.github}
                target="_blank"
                size="lg"
                variant="light"
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
            )}
            {profile.social.linkedin && (
              <ActionIcon 
                component="a"
                href={profile.social.linkedin}
                target="_blank"
                size="lg"
                variant="light"
                color="blue"
              >
                <IconBrandLinkedin size={18} />
              </ActionIcon>
            )}
            {profile.social.twitter && (
              <ActionIcon 
                component="a"
                href={profile.social.twitter}
                target="_blank"
                size="lg"
                variant="light"
                color="blue"
              >
                <IconBrandTwitter size={18} />
              </ActionIcon>
            )}
            {profile.social.dribbble && (
              <ActionIcon 
                component="a"
                href={profile.social.dribbble}
                target="_blank"
                size="lg"
                variant="light"
                color="pink"
              >
                <IconBrandDribbble size={18} />
              </ActionIcon>
            )}
            {profile.social.website && (
              <ActionIcon 
                component="a"
                href={profile.social.website}
                target="_blank"
                size="lg"
                variant="light"
              >
                <IconWorld size={18} />
              </ActionIcon>
            )}
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
