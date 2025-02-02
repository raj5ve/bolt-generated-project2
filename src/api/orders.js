import api from './axios';

// Mock orders data with cancelled orders
const mockOrders = [
  {
    id: 'ORD-2024-001',
    service: 'Website Development',
    client: {
      name: 'John Smith',
      email: 'john@example.com',
      company: 'Tech Solutions Inc.'
    },
    amount: 2500,
    status: 'active',
    timeline: {
      ordered: '2024-01-15T10:30:00Z',
      deadline: '2024-02-15T10:30:00Z'
    },
    description: 'E-commerce website development with custom product catalog and payment integration.',
    deliverables: [
      'Custom WordPress theme',
      'WooCommerce integration',
      'Payment gateway setup',
      'Mobile responsive design',
      'SEO optimization'
    ],
    progress: 60,
    messages: [
      {
        id: 1,
        sender: 'client',
        content: 'Just wanted to check on the progress of the shopping cart feature.',
        timestamp: '2024-01-25T14:20:00Z'
      },
      {
        id: 2,
        sender: 'freelancer',
        content: 'The shopping cart is about 80% complete. Will share a demo link tomorrow.',
        timestamp: '2024-01-25T14:30:00Z'
      }
    ],
    attachments: [
      {
        id: 1,
        name: 'project_requirements.pdf',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ORD-2023-045',
    service: 'Logo Design',
    client: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      company: 'Bloom Boutique'
    },
    amount: 800,
    status: 'completed',
    timeline: {
      ordered: '2023-12-01T09:00:00Z',
      completed: '2023-12-15T16:45:00Z'
    },
    description: 'Modern and elegant logo design for a fashion boutique.',
    deliverables: [
      'Logo in multiple formats',
      'Brand color palette',
      'Brand usage guidelines'
    ],
    completionDetails: {
      workSummary: 'Delivered final logo package with all requested formats and comprehensive brand guidelines.',
      notes: 'Included additional social media templates as a bonus.',
      files: [
        {
          id: 1,
          name: 'final_logo_package.zip',
          size: 25600000
        }
      ]
    },
    review: {
      rating: 5,
      comment: "Absolutely amazing work! The logo perfectly captures our brand's essence.",
      date: '2023-12-16T10:20:00Z'
    }
  },
  {
    id: 'ORD-2023-044',
    service: 'Mobile App Development',
    client: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      company: 'Fitness First'
    },
    amount: 5000,
    status: 'cancelled',
    timeline: {
      ordered: '2023-11-15T08:00:00Z',
      cancelled: '2023-11-20T14:30:00Z'
    },
    description: 'Fitness tracking mobile application development',
    cancellationReason: 'Project requirements changed significantly after initial agreement.',
    messages: [
      {
        id: 1,
        sender: 'client',
        content: 'We need to add many more features than initially discussed.',
        timestamp: '2023-11-19T10:00:00Z'
      },
      {
        id: 2,
        sender: 'freelancer',
        content: 'The new requirements would significantly impact the timeline and budget.',
        timestamp: '2023-11-19T10:30:00Z'
      }
    ]
  }
];

export const getOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders;
};

export const updateOrderStatus = async (id, status, completionData = null) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const order = mockOrders.find(o => o.id === id);
  if (order) {
    order.status = status;
    if (status === 'completed' && completionData) {
      order.completionDetails = completionData;
      order.timeline.completed = new Date().toISOString();
    }
    if (status === 'cancelled') {
      order.timeline.cancelled = new Date().toISOString();
    }
  }
  return order;
};
