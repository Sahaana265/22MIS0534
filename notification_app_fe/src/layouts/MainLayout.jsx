import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';
import { Log } from '../../../logging_middleware/logger';

const drawerWidth = 260;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path, name) => {
    Log('frontend', 'info', 'page', `Navigating to ${name}`);
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'All Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    { text: 'Priority Inbox', icon: <PriorityHighIcon />, path: '/priority' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', py: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1.2 }}>
          Affordmed
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Campus Notification System
        </Typography>
      </Toolbar>
      <Divider sx={{ opacity: 0.5 }} />
      <List sx={{ px: 2, pt: 3 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleNavigation(item.path, item.text)}
                sx={{
                  borderRadius: 3,
                  py: 1,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(241, 245, 249, 0.8)',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isSelected ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isSelected ? 600 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              Notification Center
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {format(new Date(), 'MMM dd, yyyy')}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', backgroundColor: 'background.default' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
