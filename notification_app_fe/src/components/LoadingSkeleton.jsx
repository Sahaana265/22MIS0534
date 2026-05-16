import React from 'react';
import { Card, CardContent, Skeleton, Box, Stack } from '@mui/material';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from(new Array(count)).map((_, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Skeleton variant="text" width={100} height={24} />
                  <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
                </Box>
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default LoadingSkeleton;
