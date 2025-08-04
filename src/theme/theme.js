import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#059669',
    },
    background: {
      default: '#f9f9f9',
    },
  },
  shadows: [
    'none',
    '0 2px 6px rgba(0, 0, 0, 0.05)', // Custom light shadow
    ...Array(23).fill('0 2px 6px rgba(0, 0, 0, 0.05)'), // same shadow for all levels
  ],
  customShadows: {
    card: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

export default theme;
