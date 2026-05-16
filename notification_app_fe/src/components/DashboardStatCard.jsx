import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardStatCard = ({ title, count, icon, color }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${color}.light`,
              color: `${color}.dark`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          {count}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
