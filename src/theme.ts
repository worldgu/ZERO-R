import { createTheme, Theme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 300,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 300,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#ffffff',
          margin: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          padding: '6px 16px',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export default theme;