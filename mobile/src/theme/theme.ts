/**
 * Tema MD3 personalizado em tons de azul escuro, com alto contraste e foco em legibilidade.
 * Centraliza cores e tokens de design para manter consistência visual no app.
 */
import { MD3DarkTheme, MD3Theme } from 'react-native-paper';

const palette = {
  blue900: '#0B1633',
  blue800: '#0E1D44',
  blue700: '#0F285D',
  blue600: '#0D47A1',
  cyan500: '#00B4D8',
  teal400: '#14B8A6',
  white: '#FFFFFF',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
};

export const theme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.blue600,
    onPrimary: palette.white,
    secondary: palette.cyan500,
    onSecondary: palette.white,
    tertiary: palette.teal400,
    background: palette.blue900,
    surface: palette.blue800,
    surfaceVariant: palette.blue700,
    onSurface: palette.gray200,
    outline: palette.gray400,
    error: '#EF4444',
  },
};

export type AppTheme = typeof theme;


