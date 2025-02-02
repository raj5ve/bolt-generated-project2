import { Grid, Paper, Text, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../api/stats';
import StatsCard from '../components/StatsCard';
import RecentOrders from '../components/RecentOrders';
import RecentMessages from '../components/RecentMessages';

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
    <Grid>
      <Grid.Col span={12}>
        <Group spacing="md" grow>
          <StatsCard
            title="Monthly Earnings"
            value={displayStats.monthlyEarnings}
            type="currency"
          />
          <StatsCard
            title="Profile Views"
            value={displayStats.profileViews}
            type="number"
          />
          <StatsCard
            title="Average Rating"
            value={displayStats.averageRating}
            type="rating"
          />
        </Group>
      </Grid.Col>
      
      <Grid.Col span={6}>
        <Paper p="md">
          <Text size="xl" weight={500} mb="md">Recent Orders</Text>
          <RecentOrders orders={displayStats.recentOrders} />
        </Paper>
      </Grid.Col>
      
      <Grid.Col span={6}>
        <Paper p="md">
          <Text size="xl" weight={500} mb="md">Recent Messages</Text>
          <RecentMessages messages={displayStats.recentMessages} />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
