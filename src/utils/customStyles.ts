export const colors = {
    // Base colors
    background: '#f8f9fa',
    white: '#ffffff',
    black: '#000000',
    textPrimary: '#374151',
    textSecondary: '#6B7280',
    // Text Colors
    primary: '#3b82f6',
    secondary: '#4B5563',
    tertiary: '#E5E7EB',
    light: '#cccccc',
    green: '#10b981',
    grayishBlue: '#374151',
    red: '#F43F5E'
} as const;

export const fonts = {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    body: 'Arial, Helvetica, sans-serif',
} as const;

// CSS-in-JS style objects
export const baseStyles = {
    body: {
        background: colors.background,
        color: colors.primary,
        fontFamily: fonts.body,
    },
} as const;

// Utility functions for common styling patterns
export const getTextColor = (variant: keyof typeof colors) => {
    return colors[variant];
};

export const getHighlightColor = (variant: 'grey' | 'blue' | 'green' | 'purple' | 'yellow') => {
    return colors[`${variant}Highlight` as keyof typeof colors];
};

// CSS custom properties as strings (for use with CSS-in-JS libraries)
export const cssVariables = {
    '--background': colors.background,
    '--text-color': colors.textPrimary,
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-grey': colors.light,
    '--color-green': colors.green,
    '--color-grayish-blue': colors.grayishBlue,
} as const;

// Theme variants
export const themes = {
    light: {
        background: '#ffffff',
        foreground: '#000000',
        textColor: colors.textPrimary,
    },
    dark: {
        background: '#000000',
        foreground: '#ffffff',
        textColor: colors.textPrimary,
    },
} as const;

// Export everything as a default object for convenience
const customStyles = {
    colors,
    fonts,
    baseStyles,
    cssVariables,
    themes,
    getTextColor,
    getHighlightColor,
} as const;

export default customStyles;
