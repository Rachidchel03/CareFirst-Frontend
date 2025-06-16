import { createTheme } from '@mui/material/styles';

const ORANGE = '#FF9D3C';   // primair
const PURPLE = '#593BF7';   // secundair
const SURFACE = '#F7F7F9';  // off-white card-/drawer-kleur
const DIVIDER = '#EDEDED';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: ORANGE },
    secondary: { main: PURPLE },
    background: {
      default: '#FFFFFF',
      paper:   SURFACE,
    },
    divider: DIVIDER,
    text: {
      primary:   '#1C1C1E',
      secondary: '#505050',
    },
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: ['Inter','Poppins','sans-serif'].join(','),
    button: { textTransform: 'none', fontWeight: 600 },
    h1: { fontWeight: 700, letterSpacing: '-.02em' },
    h2: { fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1C1C1E',
          borderBottom: `1px solid ${DIVIDER}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: SURFACE,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: SURFACE },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#FFFFFF',
        },
        containedSecondary: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;
