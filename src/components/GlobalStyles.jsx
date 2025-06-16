// src/GlobalStyles.jsx
import { GlobalStyles as MUIGlobal } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function GlobalStyles() {
  const theme = useTheme();
  return (
    <MUIGlobal styles={{
      body: { 
        backgroundColor: theme.palette.background.default,
        WebkitFontSmoothing: 'antialiased',
      },
      '::selection': {
        background: theme.palette.primary.main,
        color: theme.palette.background.default,
      },
    }} />
  );
}
