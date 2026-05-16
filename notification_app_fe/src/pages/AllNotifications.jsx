import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Pagination, Stack } from '@mui/material';
import FilterBar from '../components/FilterBar';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useNotifications } from '../hooks/useNotifications';
import { Log } from '../../../logging_middleware/logger';

const AllNotifications = () => {
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState('All');
  const limit = 5; // Notifications per page

  const queryParams = {
    page,
    limit,
    ...(selectedType !== 'All' && { notification_type: selectedType }),
  };

  const { data, loading, error, total, refresh } = useNotifications(queryParams);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'All Notifications page mounted');
  }, []);

  const handlePageChange = (event, value) => {
    Log('frontend', 'info', 'component', `Pagination changed to page ${value}`);
    setPage(value);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setPage(1); // Reset to first page on filter change
  };

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" color="text.primary" sx={{ mb: 4 }}>
        All Notifications
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0}>
        <FilterBar selectedType={selectedType} onTypeSelect={handleTypeSelect} />

        <Box sx={{ minHeight: 400 }}>
          {loading ? (
            <LoadingSkeleton count={limit} />
          ) : data.length === 0 ? (
            <EmptyState message={`No ${selectedType !== 'All' ? selectedType : ''} notifications available.`} />
          ) : (
            <Stack spacing={0}>
              {data.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </Stack>
          )}
        </Box>

        {!loading && data.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AllNotifications;
