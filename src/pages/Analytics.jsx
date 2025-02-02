import { Paper, Grid, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import { fetchAnalytics } from '../api/analytics';

export default function Analytics() {
  const { data, isLoading } = useQuery(['analytics'], fetchAnalytics);

  const defaultData = {
    earnings: [],
    stats: {
      monthlyEarnings: 0,
      totalOrders: 0,
      averageRating: 0,
      profileViews: 0
    }
  };

  const displayData = data || defaultData;

  return (
    <div>
      <Grid>
        <Grid.Col span={3}>
          <StatsCard
            title="Monthly Earnings"
            value={displayData.stats.monthlyEarnings}
            type="currency"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            title="Total Orders"
            value={displayData.stats.totalOrders}
            type="number"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            title="Average Rating"
            value={displayData.stats.averageRating}
            type="rating"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            title="Profile Views"
            value={displayData.stats.profileViews}
            type="number"
          />
        </Grid.Col>
      </Grid>

      <Paper p="md" mt="xl">
        <Title order={3} mb="xl">Earnings Overview</Title>
        <div style={{ width: '100%', height: 400 }}>
          {displayData.earnings.length > 0 && (
            <ResponsiveContainer>
              <LineChart data={displayData.earnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#1c7ed6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Paper>
    </div>
  );
}
