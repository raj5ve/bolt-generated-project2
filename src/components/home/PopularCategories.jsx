import { Container, Title, SimpleGrid, Paper, Group, Text, ThemeIcon } from '@mantine/core';
import { 
  IconCode, 
  IconPencil, 
  IconBrandWordpress, 
  IconDeviceMobile,
  IconBrandFigma,
  IconSeo,
  IconBuildingStore,
  IconBrandReact
} from '@tabler/icons-react';

const categories = [
  {
    icon: IconCode,
    title: 'Web Development',
    count: '2,345 professionals'
  },
  {
    icon: IconPencil,
    title: 'Content Writing',
    count: '1,892 professionals'
  },
  {
    icon: IconBrandWordpress,
    title: 'WordPress',
    count: '1,567 professionals'
  },
  {
    icon: IconDeviceMobile,
    title: 'Mobile Development',
    count: '1,234 professionals'
  },
  {
    icon: IconBrandFigma,
    title: 'UI/UX Design',
    count: '987 professionals'
  },
  {
    icon: IconSeo,
    title: 'SEO & Marketing',
    count: '876 professionals'
  },
  {
    icon: IconBuildingStore,
    title: 'E-commerce',
    count: '765 professionals'
  },
  {
    icon: IconBrandReact,
    title: 'React Development',
    count: '654 professionals'
  }
];

export default function PopularCategories() {
  return (
    <Container size="xl" py={50}>
      <Title order={2} align="center" mb={50}>
        Popular Categories on WorkWad
      </Title>

      <SimpleGrid
        cols={4}
        spacing={30}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
      >
        {categories.map((category, index) => (
          <Paper 
            key={index} 
            p="md" 
            radius="md" 
            withBorder
            sx={(theme) => ({
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <ThemeIcon
                size={40}
                radius="md"
                variant="light"
                color="blue"
              >
                <category.icon size={20} />
              </ThemeIcon>

              <div>
                <Text size="sm" weight={500}>
                  {category.title}
                </Text>
                <Text size="xs" color="dimmed">
                  {category.count}
                </Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}
