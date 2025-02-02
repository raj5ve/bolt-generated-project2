import { webDevelopmentPackages, uiuxPackages } from './packages';
import { webDevelopmentRequirements, uiuxRequirements, mobileAppRequirements } from './requirements';
import { serviceImages } from './images';

export const mockServices = [
  {
    id: '1',
    title: 'Professional Web Development',
    description: 'Custom website development using React, Node.js, and modern web technologies. Perfect for businesses looking to establish a strong online presence.',
    category: 'web',
    availability: 'Available',
    pricingType: 'packages',
    packages: webDevelopmentPackages,
    requirementsDescription: webDevelopmentRequirements.description,
    requirements: webDevelopmentRequirements.questions,
    featuredImage: serviceImages.webDevelopment.featured,
    gallery: serviceImages.webDevelopment.gallery,
    documents: []
  },
  {
    id: '2',
    title: 'UI/UX Design Services',
    description: 'Professional UI/UX design services for web and mobile applications. Create intuitive and engaging user experiences that convert visitors into customers.',
    category: 'design',
    availability: 'Available',
    pricingType: 'packages',
    packages: uiuxPackages,
    requirementsDescription: uiuxRequirements.description,
    requirements: uiuxRequirements.questions,
    featuredImage: serviceImages.uiux.featured,
    gallery: serviceImages.uiux.gallery,
    documents: []
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile app development using React Native. Create powerful, scalable mobile applications for iOS and Android.',
    category: 'mobile',
    availability: 'Limited',
    pricingType: 'fixed',
    fixedPrice: 5999,
    hourlyRate: null,
    packages: [],
    requirementsDescription: mobileAppRequirements.description,
    requirements: mobileAppRequirements.questions,
    featuredImage: serviceImages.mobileApp.featured,
    gallery: serviceImages.mobileApp.gallery,
    documents: []
  }
];
