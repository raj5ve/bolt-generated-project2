import { 
  Paper, 
  Stack, 
  Group, 
  Title, 
  Text, 
  Badge, 
  Button, 
  List, 
  ThemeIcon, 
  Divider,
  Image,
  SimpleGrid,
  Tabs,
  Card
} from '@mantine/core';
import { 
  IconCheck, 
  IconClock, 
  IconPackage, 
  IconFileText,
  IconPhoto,
  IconInfoCircle
} from '@tabler/icons-react';
import { getServiceStartingPrice } from '../../api/services';

export default function ServiceContent({ service }) {
  return (
    <Stack spacing="xl">
      {/* Featured Image */}
      {service.featuredImage && (
        <Paper shadow="sm" radius="md" p={0} style={{ overflow: 'hidden' }}>
          <Image
            src={service.featuredImage.url}
            height={300}
            fit="cover"
            alt={service.title}
          />
        </Paper>
      )}

      {/* Main Content */}
      <Paper shadow="sm" radius="md" p="xl">
        <Stack spacing="xl">
          {/* Service Header */}
          <div>
            <Group position="apart" mb="xs">
              <Badge size="lg" color={service.availability === 'Available' ? 'green' : 'yellow'}>
                {service.availability}
              </Badge>
              <Badge color="blue" size="lg">
                {service.category}
              </Badge>
            </Group>
            <Title order={1} mb="md">{service.title}</Title>
            <Text size="lg" color="dimmed">
              {service.description}
            </Text>
          </div>

          <Divider />

          <Tabs defaultValue="packages">
            <Tabs.List grow mb="md">
              <Tabs.Tab 
                value="packages" 
                icon={<IconPackage size={16} />}
              >
                Packages
              </Tabs.Tab>
              <Tabs.Tab 
                value="description" 
                icon={<IconInfoCircle size={16} />}
              >
                Description
              </Tabs.Tab>
              <Tabs.Tab 
                value="gallery" 
                icon={<IconPhoto size={16} />}
              >
                Gallery
              </Tabs.Tab>
              <Tabs.Tab 
                value="requirements" 
                icon={<IconFileText size={16} />}
              >
                Requirements
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="packages">
              {service.pricingType === 'packages' ? (
                <SimpleGrid
                  cols={3}
                  spacing="md"
                  breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'sm', cols: 1 },
                  ]}
                >
                  {service.packages.map((pkg) => (
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
                            <Group key={index} spacing="xs" noWrap>
                              <ThemeIcon 
                                color="green" 
                                size={20} 
                                radius="xl"
                              >
                                <IconCheck size={12} />
                              </ThemeIcon>
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
              ) : (
                <Card withBorder p="xl" radius="md">
                  <Stack align="center" spacing="xs">
                    <Text size="lg" weight={500}>Fixed Price</Text>
                    <Text size="xl" weight={700}>
                      {getServiceStartingPrice(service)}
                    </Text>
                    <Button mt="md">Get Started</Button>
                  </Stack>
                </Card>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="description">
              <Stack spacing="xl">
                <div>
                  <Title order={3} mb="md">What's Included</Title>
                  <List
                    spacing="md"
                    size="lg"
                    icon={
                      <ThemeIcon color="blue" size={24} radius="xl">
                        <IconCheck size={16} />
                      </ThemeIcon>
                    }
                  >
                    {service.includes?.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>

                <Group>
                  <ThemeIcon size="xl" radius="xl" color="blue">
                    <IconClock size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="lg" weight={500}>Delivery Time</Text>
                    <Text color="dimmed">{service.deliveryTime}</Text>
                  </div>
                </Group>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="gallery">
              {service.gallery?.length > 0 ? (
                <SimpleGrid
                  cols={2}
                  spacing="md"
                  breakpoints={[
                    { maxWidth: 'sm', cols: 1 },
                  ]}
                >
                  {service.gallery.map((image) => (
                    <Image
                      key={image.id}
                      src={image.url}
                      radius="md"
                      height={200}
                      fit="cover"
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Text color="dimmed" align="center">No gallery images available</Text>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="requirements">
              <Stack spacing="xl">
                <Text>{service.requirementsDescription}</Text>
                
                {service.requirements?.length > 0 && (
                  <Stack spacing="md">
                    <Title order={3}>Requirements Checklist</Title>
                    <List
                      spacing="md"
                      icon={
                        <ThemeIcon color="blue" size={24} radius="xl">
                          <IconCheck size={16} />
                        </ThemeIcon>
                      }
                    >
                      {service.requirements.map((req, index) => (
                        <List.Item key={index}>{req.question}</List.Item>
                      ))}
                    </List>
                  </Stack>
                )}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Paper>
    </Stack>
  );
}
