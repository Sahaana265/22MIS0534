import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';

const NotificationCard = ({ notification }) => {
  const { notification_type, message, timestamp } = notification;

  const getTypeConfig = (type) => {
    switch (type) {
      case 'Placement':
        return { color: 'primary', icon: <BusinessCenterIcon fontSize="small" />, priority: 'High' };
      case 'Result':
        return { color: 'success', icon: <AssignmentIcon fontSize="small" />, priority: 'Medium' };
      case 'Event':
        return { color: 'info', icon: <EventIcon fontSize="small" />, priority: 'Low' };
      default:
        return { color: 'default', icon: null, priority: 'None' };
    }
  };

  const config = getTypeConfig(notification_type);

  return (
    <Card 
      sx={{ 
        mb: 2, 
        position: 'relative',
        overflow: 'visible',
        borderLeft: `6px solid`,
        borderLeftColor: `${config.color}.main`,
        '&:hover': { 
          transform: 'translateY(-2px)', 
          boxShadow: '0 12px 24px -8px rgba(0,0,0,0.1)' 
        } 
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
            <Box
              sx={{
                mt: 0.25,
                p: 1.2,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${config.color}.light`,
                color: '#fff',
                boxShadow: `0 4px 10px rgba(0,0,0,0.05)`,
              }}
            >
              {config.icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                  {notification_type}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.95rem' }}>
                {message}
              </Typography>
              <Box>
                <Chip 
                  label={`Priority: ${config.priority}`} 
                  size="small" 
                  sx={{ 
                    height: 22, 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    backgroundColor: `${config.color}.light`,
                    color: `${config.color}.dark`,
                    opacity: 0.9,
                    border: 'none',
                  }} 
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
