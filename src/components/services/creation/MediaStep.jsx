import { Stack, Text, Group, Button, Image, Paper, FileButton, SimpleGrid, MediaQuery } from '@mantine/core';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';

export default function MediaStep({ initialData = {}, onSubmit, onBack }) {
  const [featuredImage, setFeaturedImage] = useState(initialData.featuredImage);
  const [gallery, setGallery] = useState(initialData.gallery || []);
  const [documents, setDocuments] = useState(initialData.documents || []);
  const theme = useMantineTheme();

  const handleFeaturedImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFeaturedImage({ file, url: imageUrl });
    }
  };

  const handleGalleryUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }));
    setGallery([...gallery, ...newImages]);
  };

  const handleDocumentUpload = (files) => {
    const newDocs = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size
    }));
    setDocuments([...documents, ...newDocs]);
  };

  return (
    <Stack spacing="xl">
      {/* Featured Image */}
      <div>
        <Text weight={500} size="sm" mb="xs">Featured Image</Text>
        {featuredImage ? (
          <Paper withBorder p="xs">
            <Group position="apart">
              <Image
                src={featuredImage.url}
                width={200}
                height={120}
                fit="cover"
                radius="sm"
              />
              <Button 
                variant="subtle" 
                color="red"
                onClick={() => setFeaturedImage(null)}
                size="sm"
              >
                <IconX size={16} />
              </Button>
            </Group>
          </Paper>
        ) : (
          <FileButton
            onChange={handleFeaturedImageUpload}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button 
                {...props}
                variant="outline"
                leftIcon={<IconUpload size={16} />}
                fullWidth={theme.fn.smallerThan('sm')}
              >
                Upload Featured Image
              </Button>
            )}
          </FileButton>
        )}
      </div>

      {/* Gallery */}
      <div>
        <Text weight={500} size="sm" mb="xs">Gallery Images</Text>
        <SimpleGrid 
          cols={3} 
          spacing="md" 
          mb="md"
          breakpoints={[
            { maxWidth: theme.breakpoints.sm, cols: 2 },
            { maxWidth: theme.breakpoints.xs, cols: 1 },
          ]}
        >
          {gallery.map((image) => (
            <Paper key={image.id} withBorder p="xs">
              <Stack spacing="xs">
                <Image
                  src={image.url}
                  height={100}
                  fit="cover"
                  radius="sm"
                />
                <Button 
                  variant="subtle" 
                  color="red" 
                  size="xs"
                  onClick={() => setGallery(gallery.filter(img => img.id !== image.id))}
                  fullWidth
                >
                  Remove
                </Button>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
        <FileButton
          onChange={handleGalleryUpload}
          accept="image/png,image/jpeg"
          multiple
        >
          {(props) => (
            <Button 
              {...props}
              variant="outline"
              leftIcon={<IconUpload size={16} />}
              fullWidth={theme.fn.smallerThan('sm')}
            >
              Add Gallery Images
            </Button>
          )}
        </FileButton>
      </div>

      {/* Documents */}
      <div>
        <Text weight={500} size="sm" mb="xs">Additional Documents</Text>
        <Stack spacing="xs" mb="md">
          {documents.map((doc) => (
            <Paper key={doc.id} withBorder p="xs">
              <Group position="apart">
                <Group spacing="sm" noWrap>
                  <IconFile size={20} />
                  <div style={{ minWidth: 0 }}>
                    <Text size="sm" truncate>{doc.name}</Text>
                    <Text size="xs" color="dimmed">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>
                </Group>
                <Button 
                  variant="subtle" 
                  color="red" 
                  size="xs"
                  onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                >
                  Remove
                </Button>
              </Group>
            </Paper>
          ))}
        </Stack>
        <FileButton
          onChange={handleDocumentUpload}
          accept=".pdf,.doc,.docx"
          multiple
        >
          {(props) => (
            <Button 
              {...props}
              variant="outline"
              leftIcon={<IconUpload size={16} />}
              fullWidth={theme.fn.smallerThan('sm')}
            >
              Add Documents
            </Button>
          )}
        </FileButton>
      </div>

      <Group position="apart" mt="xl">
        <Button variant="light" onClick={onBack} fullWidth={theme.fn.smallerThan('sm')}>
          Back
        </Button>
        <Button 
          onClick={() => onSubmit({ featuredImage, gallery, documents })}
          fullWidth={theme.fn.smallerThan('sm')}
        >
          Next Step
        </Button>
      </Group>
    </Stack>
  );
}
