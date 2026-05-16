import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#F5F7FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    error: {
      main: '#F43F5E',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#F97316',
    },
    success: {
      main: '#10B981',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      color: '#0F172A',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      color: '#1E293B',
    },
    h6: {
      fontWeight: 600,
      color: '#0F172A',
    },
    subtitle1: {
      fontSize: '1.05rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#64748B',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          transition: 'all 0.3s ease',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          color: '#0F172A',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid rgba(226, 232, 240, 0.6)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;
