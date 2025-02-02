import { Box } from '@mantine/core';
import PublicLayout from '../components/public/PublicLayout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PopularCategories from '../components/home/PopularCategories';
import HowItWorks from '../components/home/HowItWorks';

export default function Home() {
  return (
    <PublicLayout>
      <Box>
        <HeroSection />
        <FeaturesSection />
        <PopularCategories />
        <HowItWorks />
      </Box>
    </PublicLayout>
  );
}
