import { 
  Stack, 
  TextInput, 
  Select, 
  NumberInput, 
  Switch, 
  Button, 
  Group, 
  Paper, 
  ActionIcon,
  Text,
  Divider
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';

const pricingTypes = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'packages', label: 'Package Based' }
];

export default function PricingStep({ initialData = {}, onSubmit, onBack }) {
  const theme = useMantineTheme();
  const [packages, setPackages] = useState(initialData.packages || [
    { 
      id: 1, 
      name: 'Basic', 
      price: 0, 
      deliveryTime: '1 day',
      features: ['Feature 1']
    }
  ]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      pricingType: initialData.pricingType || 'fixed',
      fixedPrice: initialData.fixedPrice || 0,
      hourlyRate: initialData.hourlyRate || 0,
      enableCustomQuotes: initialData.enableCustomQuotes || false
    }
  });

  const pricingType = watch('pricingType');

  const addPackage = () => {
    setPackages([
      ...packages,
      { 
        id: Date.now(),
        name: '',
        price: 0,
        deliveryTime: '1 day',
        features: ['']
      }
    ]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const updatePackage = (id, field, value) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ));
  };

  const addFeature = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, features: [...pkg.features, ''] }
        : pkg
    ));
  };

  const updateFeature = (packageId, index, value) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? {
            ...pkg,
            features: pkg.features.map((feature, i) => 
              i === index ? value : feature
            )
          }
        : pkg
    ));
  };

  const removeFeature = (packageId, index) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? {
            ...pkg,
            features: pkg.features.filter((_, i) => i !== index)
          }
        : pkg
    ));
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, packages }))}>
      <Stack spacing="xl">
        <Controller
          name="pricingType"
          control={control}
          rules={{ required: 'Pricing type is required' }}
          render={({ field }) => (
            <Select
              label="Pricing Type"
              data={pricingTypes}
              required
              {...field}
            />
          )}
        />

        {pricingType === 'fixed' && (
          <Controller
            name="fixedPrice"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Fixed Price"
                required
                min={0}
                precision={2}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
                {...field}
              />
            )}
          />
        )}

        {pricingType === 'hourly' && (
          <Controller
            name="hourlyRate"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Hourly Rate"
                required
                min={0}
                precision={2}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
                {...field}
              />
            )}
          />
        )}

        {pricingType === 'packages' && (
          <>
            <Text weight={500}>Service Packages</Text>
            <Stack spacing="md">
              {packages.map((pkg, index) => (
                <Paper key={pkg.id} withBorder p="md">
                  <Stack spacing="md">
                    <Group position="apart">
                      <Text weight={500}>Package {index + 1}</Text>
                      {packages.length > 1 && (
                        <ActionIcon color="red" onClick={() => removePackage(pkg.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      )}
                    </Group>

                    <TextInput
                      label="Package Name"
                      value={pkg.name}
                      onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                      placeholder="e.g., Basic, Standard, Premium"
                      required
                    />

                    <Group grow>
                      <NumberInput
                        label="Price"
                        value={pkg.price}
                        onChange={(value) => updatePackage(pkg.id, 'price', value)}
                        min={0}
                        precision={2}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                          !Number.isNaN(parseFloat(value))
                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : '$ '
                        }
                        required
                      />

                      <TextInput
                        label="Delivery Time"
                        value={pkg.deliveryTime}
                        onChange={(e) => updatePackage(pkg.id, 'deliveryTime', e.target.value)}
                        placeholder="e.g., 2 days"
                        required
                      />
                    </Group>

                    <Divider label="Features" labelPosition="center" />

                    <Stack spacing="xs">
                      {pkg.features.map((feature, featureIndex) => (
                        <Group key={featureIndex} spacing="xs">
                          <TextInput
                            style={{ flex: 1 }}
                            value={feature}
                            onChange={(e) => updateFeature(pkg.id, featureIndex, e.target.value)}
                            placeholder={`Feature ${featureIndex + 1}`}
                          />
                          {pkg.features.length > 1 && (
                            <ActionIcon
                              color="red"
                              onClick={() => removeFeature(pkg.id, featureIndex)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          )}
                        </Group>
                      ))}
                      <Button
                        variant="light"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => addFeature(pkg.id)}
                        fullWidth
                      >
                        Add Feature
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              ))}

              <Button
                variant="outline"
                leftIcon={<IconPlus size={16} />}
                onClick={addPackage}
                fullWidth
              >
                Add Package
              </Button>
            </Stack>
          </>
        )}

        <Controller
          name="enableCustomQuotes"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Switch
              label="Enable custom quotes"
              description="Allow clients to request custom quotes"
              checked={value}
              onChange={(event) => onChange(event.currentTarget.checked)}
            />
          )}
        />

        <Group position="apart" mt="xl">
          <Button 
            variant="light" 
            onClick={onBack}
            fullWidth={theme.fn.smallerThan('sm')}
          >
            Back
          </Button>
          <Button 
            type="submit"
            fullWidth={theme.fn.smallerThan('sm')}
          >
            Next Step
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
