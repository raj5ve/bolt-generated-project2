// Update mock profile data with services
const MOCK_PROFILE = {
  id: '1',
  name: 'Test User',
  username: 'testuser',
  title: 'Full Stack Developer',
  bio: 'Experienced developer with over 5 years of expertise in React, Node.js, and cloud technologies. Passionate about creating efficient and scalable web applications that solve real business problems.',
  avatar: null,
  location: 'New York, USA',
  hourlyRate: 75,
  responseTime: '24h',
  availability: 'available',
  skills: [
    'React',
    'Node.js',
    'TypeScript',
    'AWS',
    'MongoDB',
    'Docker',
    'GraphQL',
    'Next.js'
  ],
  social: {
    github: 'https://github.com/testuser',
    linkedin: 'https://linkedin.com/in/testuser',
    twitter: 'https://twitter.com/testuser',
    dribbble: 'https://dribbble.com/testuser',
    website: 'https://testuser.dev'
  },
  portfolio: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-featured e-commerce platform with React and Node.js',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: '2',
      title: 'Mobile App',
      description: 'Developed a fitness tracking mobile application',
      image: 'https://images.unsplash.com/photo-1526502899974-9b6c3d4e647d?w=800&auto=format&fit=crop&q=80',
      tags: ['React Native', 'Firebase']
    }
  ],
  reviews: [
    {
      id: '1',
      name: 'John Smith',
      rating: 5,
      comment: 'Excellent work! Delivered the project ahead of schedule.',
      date: '2 weeks ago'
    },
    {
      id: '2',
      name: 'Emily Brown',
      rating: 4,
      comment: 'Great communication and quality work.',
      date: '1 month ago'
    }
  ],
  // Add services to profile
  services: [
    {
      id: '1',
      title: 'Professional Web Development',
      description: 'Custom website development using React, Node.js, and modern web technologies.',
      price: 'From $999',
      type: 'Development',
      availability: 'Available'
    },
    {
      id: '2',
      title: 'UI/UX Design Services',
      description: 'Professional UI/UX design services for web and mobile applications.',
      price: 'From $799',
      type: 'Design',
      availability: 'Available'
    },
    {
      id: '3',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile app development using React Native.',
      price: '$5,999',
      type: 'Development',
      availability: 'Limited'
    }
  ]
};

export const getProfile = async (username) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PROFILE;
};

export const updateProfile = async (profileData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...MOCK_PROFILE, ...profileData };
};

export default {
  getProfile,
  updateProfile
};
