import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardStatCard = ({ title, count, icon, color }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: 3, // Perfect 24px padding all around
          '&:last-child': { pb: 3 }, // Ensure bottom padding matches
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5, // Slightly softer pill box
              backgroundColor: `${color}.light`,
              color: `${color}.dark`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px rgba(0,0,0,0.03)`, // Subtle depth
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', lineHeight: 1.2 }}>
          {count}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
