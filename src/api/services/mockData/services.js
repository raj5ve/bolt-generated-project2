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
    documents: [
      {
        id: '1',
        name: 'Project Brief Template.pdf',
        size: 512000, // 500KB
        url: '#'
      },
      {
        id: '2',
        name: 'Technical Requirements.pdf',
        size: 1024000, // 1MB
        url: '#'
      }
    ],
    includes: [
      'Custom design and development',
      'Responsive layout for all devices',
      'SEO optimization',
      'Performance optimization',
      'Security implementation',
      'Browser compatibility testing',
      'Content management system',
      '30 days of support'
    ],
    deliveryTime: '2-4 weeks',
    provider: {
      id: '1',
      name: 'John Smith',
      title: 'Senior Web Developer',
      rating: 4.9,
      totalReviews: 128
    }
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
    documents: [
      {
        id: '1',
        name: 'Design Process Guide.pdf',
        size: 768000, // 750KB
        url: '#'
      }
    ],
    includes: [
      'User research and analysis',
      'Wireframing and prototyping',
      'Visual design',
      'Interactive prototypes',
      'Design system creation',
      'Usability testing',
      'Design documentation',
      'Source files included'
    ],
    deliveryTime: '1-3 weeks',
    provider: {
      id: '2',
      name: 'Sarah Wilson',
      title: 'Senior UI/UX Designer',
      rating: 4.8,
      totalReviews: 93
    }
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
    documents: [
      {
        id: '1',
        name: 'App Development Process.pdf',
        size: 1536000, // 1.5MB
        url: '#'
      },
      {
        id: '2',
        name: 'API Documentation.pdf',
        size: 2048000, // 2MB
        url: '#'
      }
    ],
    includes: [
      'Native iOS and Android development',
      'Cross-platform compatibility',
      'UI/UX design',
      'API integration',
      'Push notifications',
      'Analytics integration',
      'App store submission',
      '3 months of support'
    ],
    deliveryTime: '6-8 weeks',
    provider: {
      id: '3',
      name: 'Mike Johnson',
      title: 'Mobile App Developer',
      rating: 4.7,
      totalReviews: 76
    }
  },
  {
    id: '4',
    title: 'WordPress Development & Customization',
    description: 'Custom WordPress development and theme customization. Create a professional website with a powerful content management system.',
    category: 'web',
    availability: 'Available',
    pricingType: 'packages',
    packages: [
      {
        id: '1',
        name: 'Basic',
        price: 799,
        deliveryTime: '1 week',
        features: [
          'Premium theme installation',
          'Basic customization',
          'Essential plugins setup',
          'Contact form',
          'Mobile responsive',
          'SEO basics',
          '2 revisions'
        ]
      },
      {
        id: '2',
        name: 'Professional',
        price: 1499,
        deliveryTime: '2 weeks',
        features: [
          'Custom theme development',
          'Advanced customization',
          'E-commerce setup',
          'Premium plugins',
          'Speed optimization',
          'Security setup',
          '4 revisions'
        ]
      }
    ],
    requirementsDescription: 'To create the perfect WordPress website for your needs, please provide:',
    requirements: [
      { id: '1', question: 'What is your business about?' },
      { id: '2', question: 'Do you have a preferred theme?' },
      { id: '3', question: 'What features do you need?' },
      { id: '4', question: 'Do you need e-commerce functionality?' }
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop&q=80',
      file: null
    },
    gallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&auto=format&fit=crop&q=80',
        file: null
      }
    ],
    documents: [
      {
        id: '1',
        name: 'WordPress Guide.pdf',
        size: 1024000, // 1MB
        url: '#'
      }
    ],
    includes: [
      'WordPress installation and setup',
      'Theme customization',
      'Plugin configuration',
      'Content upload',
      'SEO optimization',
      'Security setup',
      'Performance optimization',
      'Training session'
    ],
    deliveryTime: '1-2 weeks',
    provider: {
      id: '4',
      name: 'David Brown',
      title: 'WordPress Developer',
      rating: 4.9,
      totalReviews: 154
    }
  },
  {
    id: '5',
    title: 'SEO & Digital Marketing',
    description: 'Comprehensive SEO and digital marketing services to improve your online visibility and drive more traffic to your website.',
    category: 'marketing',
    availability: 'Available',
    pricingType: 'packages',
    packages: [
      {
        id: '1',
        name: 'Starter',
        price: 599,
        deliveryTime: '1 month',
        features: [
          'Keyword research',
          'On-page SEO',
          'Technical SEO audit',
          'Monthly report',
          'Basic analytics setup',
          'Content optimization',
          '2 blog posts'
        ]
      },
      {
        id: '2',
        name: 'Growth',
        price: 1299,
        deliveryTime: '1 month',
        features: [
          'Advanced keyword research',
          'Competitor analysis',
          'Link building',
          'Content strategy',
          'Social media optimization',
          'Weekly reporting',
          '4 blog posts'
        ]
      }
    ],
    requirementsDescription: 'To create an effective SEO strategy, please provide:',
    requirements: [
      { id: '1', question: 'What are your main business goals?' },
      { id: '2', question: 'Who are your competitors?' },
      { id: '3', question: 'What are your target keywords?' },
      { id: '4', question: 'What is your target market?' }
    ],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop&q=80',
      file: null
    },
    gallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
        file: null
      }
    ],
    documents: [
      {
        id: '1',
        name: 'SEO Strategy Template.pdf',
        size: 819200, // 800KB
        url: '#'
      }
    ],
    includes: [
      'Comprehensive SEO audit',
      'Keyword research and analysis',
      'On-page optimization',
      'Content strategy',
      'Link building',
      'Monthly reporting',
      'Analytics setup',
      'Competitor analysis'
    ],
    deliveryTime: 'Ongoing monthly service',
    provider: {
      id: '5',
      name: 'Emma Davis',
      title: 'SEO Specialist',
      rating: 4.8,
      totalReviews: 89
    }
  }
];
