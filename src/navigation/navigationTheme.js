import { DefaultTheme } from '@react-navigation/native';

import Colors from '../res/colors';

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.secondary,
    text: Colors.secondary,
    border: Colors.mediumGrey,
    background: Colors.ghostWhite
  }
};

export default navigationTheme;