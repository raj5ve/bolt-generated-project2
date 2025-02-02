import { Grid, Paper, Text, Group, MediaQuery } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../api/stats';
import StatsCard from './StatsCard';
import RecentOrders from './RecentOrders';
import RecentMessages from './RecentMessages';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery(['dashboardStats'], fetchDashboardStats);

  const defaultStats = {
    monthlyEarnings: 0,
    profileViews: 0,
    averageRating: 0,
    recentOrders: [],
    recentMessages: []
  };

  const displayStats = stats || defaultStats;

  return (
    <Grid gutter="md">
      <Grid.Col xs={12}>
        <Grid gutter="md">
          <Grid.Col xs={12} sm={4}>
            <StatsCard
              title="Monthly Earnings"
              value={displayStats.monthlyEarnings}
              type="currency"
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <StatsCard
              title="Profile Views"
              value={displayStats.profileViews}
              type="number"
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <StatsCard
              title="Average Rating"
              value={displayStats.averageRating}
              type="rating"
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      
      <Grid.Col xs={12} md={6}>
        <Paper p="md" withBorder>
          <Text size="xl" weight={500} mb="md">Recent Orders</Text>
          <RecentOrders orders={displayStats.recentOrders} />
        </Paper>
      </Grid.Col>
      
      <Grid.Col xs={12} md={6}>
        <Paper p="md" withBorder>
          <Text size="xl" weight={500} mb="md">Recent Messages</Text>
          <RecentMessages messages={displayStats.recentMessages} />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
