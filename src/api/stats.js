import api from './axios';

export const fetchDashboardStats = async () => {
  // Mock data with more realistic orders
  return {
    monthlyEarnings: 2500,
    profileViews: 1234,
    averageRating: 4.8,
    recentOrders: [
      {
        id: 'ORD-001',
        service: 'Web Development',
        client: 'John Doe',
        amount: 500,
        status: 'active'
      },
      {
        id: 'ORD-002',
        service: 'UI Design',
        client: 'Jane Smith',
        amount: 300,
        status: 'completed'
      },
      {
        id: 'ORD-003',
        service: 'Mobile App',
        client: 'Mike Johnson',
        amount: 1200,
        status: 'pending'
      },
      {
        id: 'ORD-004',
        service: 'Logo Design',
        client: 'Sarah Wilson',
        amount: 250,
        status: 'completed'
      }
    ],
    recentMessages: [
      {
        id: '1',
        sender: 'Alice Brown',
        content: "Hello, I'm interested in your services",
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        sender: 'Bob Wilson',
        content: 'Thanks for the quick delivery!',
        timestamp: '5 hours ago'
      }
    ]
  };
};
