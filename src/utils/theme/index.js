export const lightTheme = {
  colors: {
    primary: '#3182CE',
    secondary: '#68D391',
    success: '#38A169',
    danger: '#E53E3E',
    warning: '#D69E2E',
    info: '#3182CE',
    light: '#F7FAFC',
    dark: '#1A365D',
    background: '#FFFFFF',
    surface: '#F7FAFC',
    text: '#1A365D',
    textSecondary: '#4A5568',
    border: '#E2E8F0',
    shadow: 'rgba(26, 54, 93, 0.1)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#1A365D',
    surface: '#2D3748',
    text: '#FFFFFF',
    textSecondary: '#A0AEC0',
    border: '#4A5568',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};
