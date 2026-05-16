import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useNotifications } from '../hooks/useNotifications';
import { getTopPriorityUnread } from '../utils/priority';
import { Log } from '../../../logging_middleware/logger';

const PriorityInbox = () => {
  const [topN, setTopN] = useState(10);
  
  // We fetch a larger limit to ensure we have enough items to extract the top N globally
  // In a real production system, the backend would have a dedicated /priority endpoint
  const { data, loading, error, refresh } = useNotifications({ limit: 100 });

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Priority Inbox page mounted');
  }, []);

  const handleTopNChange = (event) => {
    const value = event.target.value;
    Log('frontend', 'info', 'component', `Priority filter changed to Top ${value}`);
    setTopN(value);
  };

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  // Stage 1 logic used here: Extract Top N highest priority
  const topNotifications = getTopPriorityUnread(data, topN);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" color="text.primary">
          Priority Inbox
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="top-n-select-label">Show</InputLabel>
          <Select
            labelId="top-n-select-label"
            id="top-n-select"
            value={topN}
            label="Show"
            onChange={handleTopNChange}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(to right bottom, #ffffff, #fdfbfa)' }} elevation={0}>
        <Box sx={{ minHeight: 400 }}>
          {loading ? (
            <LoadingSkeleton count={topN > 5 ? 5 : topN} />
          ) : topNotifications.length === 0 ? (
            <EmptyState message="No high priority unread notifications." />
          ) : (
            <Stack spacing={0}>
              {topNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PriorityInbox;
