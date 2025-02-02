import api from './axios';

export const fetchAnalytics = async () => {
  // Mock data
  return {
    earnings: [
      { date: '2023-01', amount: 1200 },
      { date: '2023-02', amount: 1800 },
      { date: '2023-03', amount: 2200 },
      { date: '2023-04', amount: 2600 },
    ],
    stats: {
      monthlyEarnings: 2600,
      totalOrders: 45,
      averageRating: 4.8,
      profileViews: 1250
    }
  };
};
