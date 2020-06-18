import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e85a4f',
    },
    secondary: {
      main: '#e98074',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#eeeeee',
    },
    text: {
      secondary: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
