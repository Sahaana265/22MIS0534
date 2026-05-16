import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Stack, Button } from '@mui/material';
import DashboardStatCard from '../components/DashboardStatCard';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { useNotifications } from '../hooks/useNotifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import { Log } from '../../../logging_middleware/logger';
import { getTopPriorityUnread } from '../utils/priority';


const Dashboard = () => {
  const { data, loading, error, refresh } = useNotifications({ limit: 50 }); // Fetch more for stats
  const navigate = useNavigate();

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Dashboard page mounted');
  }, []);

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  // Calculate stats
  const placements = data.filter((n) => n.notification_type === 'Placement').length;
  const results = data.filter((n) => n.notification_type === 'Result').length;
  const events = data.filter((n) => n.notification_type === 'Event').length;

  // Extract a few top priorities for quick view
  const topPriority = getTopPriorityUnread(data, 3);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="text.primary">
          Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard title="Total Notifications" count={data.length} icon={<NotificationsActiveIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard title="Placements" count={placements} icon={<BusinessCenterIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard title="Results" count={results} icon={<AssignmentIcon />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard title="Events" count={events} icon={<EventIcon />} color="info" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Button size="small" onClick={() => navigate('/notifications')}>View All</Button>
            </Box>
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : (
              <Stack spacing={0}>
                {data.slice(0, 4).map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Top Priority Action Required</Typography>
              <Button size="small" onClick={() => navigate('/priority')} color="warning">Open Inbox</Button>
            </Box>
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : topPriority.length > 0 ? (
              <Stack spacing={0}>
                {topPriority.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">No high priority notifications at the moment.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
