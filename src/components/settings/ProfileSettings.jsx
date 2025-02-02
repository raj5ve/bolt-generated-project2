import { useState } from 'react';
import { 
  TextInput, 
  Textarea, 
  Button, 
  Stack, 
  Group, 
  Text, 
  Select, 
  Avatar,
  Paper,
  FileButton,
  Container
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconUpload } from '@tabler/icons-react';
import { countries } from '../../data/countries';

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      businessName: '',
      firstName: '',
      lastName: '',
      country: '',
      shortBio: '',
      longBio: ''
    }
  });

  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const onSubmit = (data) => {
    console.log('Profile data:', { ...data, profileImage });
  };

  return (
    <Container size="100%" p={0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={30}>
          <Paper withBorder p="xl" radius="md">
            <Text size="xl" weight={500} mb="xl">Profile Picture</Text>
            <Group align="center" spacing="xl">
              <Avatar 
                src={profileImage} 
                size={120} 
                radius={120}
                sx={{ border: '1px solid #eee' }}
              />
              <FileButton
                onChange={handleImageUpload}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button 
                    {...props}
                    variant="outline"
                    leftIcon={<IconUpload size={16} />}
                    size="md"
                  >
                    Upload Picture
                  </Button>
                )}
              </FileButton>
            </Group>
          </Paper>

          <Paper withBorder p="xl" radius="md">
            <Text size="xl" weight={500} mb="xl">Business Information</Text>
            <Stack spacing="xl">
              <TextInput
                label="Business Name"
                placeholder="Your business name"
                size="md"
                {...register('businessName', { required: 'Business name is required' })}
                error={errors.businessName?.message}
              />

              <Group grow align="flex-start" spacing="xl">
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  size="md"
                  {...register('firstName', { required: 'First name is required' })}
                  error={errors.firstName?.message}
                />
                
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  size="md"
                  {...register('lastName', { required: 'Last name is required' })}
                  error={errors.lastName?.message}
                />
              </Group>

              <Select
                label="Country"
                placeholder="Select your country"
                data={countries}
                searchable
                size="md"
                {...register('country', { required: 'Country is required' })}
                error={errors.country?.message}
              />
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md">
            <Text size="xl" weight={500} mb="xl">Bio</Text>
            <Stack spacing="xl">
              <Textarea
                label="Short Bio"
                placeholder="Brief description (max 150 characters)"
                maxLength={150}
                size="md"
                {...register('shortBio', { required: 'Short bio is required' })}
                error={errors.shortBio?.message}
              />
              
              <Textarea
                label="Long Bio"
                placeholder="Detailed description of your business and services"
                minRows={4}
                size="md"
                {...register('longBio', { required: 'Long bio is required' })}
                error={errors.longBio?.message}
              />
            </Stack>
          </Paper>

          <Group position="right" mt="xl">
            <Button type="submit" size="md">
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
