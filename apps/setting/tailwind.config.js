/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        hover: 'var(--primary-hover)',
        active: 'var(--primary-active)',
        dark: 'var(--primary-dark)',
        bg: 'var(--primary-bg)'
      },
      success: {
        DEFAULT: 'var(--success)',
        bg: 'var(--success-bg)'
      },
      warning: {
        DEFAULT: 'var(--warning)',
        bg: 'var(--warning-bg)'
      },
      error: {
        DEFAULT: 'var(--error)',
        bg: 'var(--error-bg)'
      },
      bg: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)'
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)'
      },
      border: 'var(--border-color)',
      white: '#ffffff',
      transparent: 'transparent',
      current: 'currentColor'
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
      '2xl': 'var(--spacing-2xl)',
      '3xl': 'var(--spacing-3xl)',
      none: '0',
      'control-mini': 'var(--control-height-mini)',
      'control-sm': 'var(--control-height-sm)',
      'control-md': 'var(--control-height-md)',
      'control-lg': 'var(--control-height-lg)',
      'control-px-mini': 'var(--control-padding-x-mini)',
      'control-px-sm': 'var(--control-padding-x-sm)',
      'control-px-md': 'var(--control-padding-x-md)',
      'control-px-lg': 'var(--control-padding-x-lg)',
      'control-search': 'var(--control-search-padding)',
      'icon-md': 'var(--icon-size-md)',
      'icon-lg': 'var(--icon-size-lg)',
      datepicker: 'var(--datepicker-width)',
      'view-toggle': 'var(--view-toggle-width)',
      'app-switcher': 'var(--app-switcher-width)',
      'modal-sm': 'var(--modal-width-sm)',
      'modal-md': 'var(--modal-width-md)',
      'modal-lg': 'var(--modal-width-lg)',
      'modal-max': 'var(--modal-max-height)',
      'modal-action': 'var(--modal-action-width)',
      0: '0',
      auto: 'auto'
    },
    fontSize: {
      xs: ['var(--font-size-xs)', { lineHeight: '1.5' }],
      sm: ['var(--font-size-sm)', { lineHeight: '1.5' }],
      base: ['var(--font-size-base)', { lineHeight: '1.5' }],
      lg: ['var(--font-size-lg)', { lineHeight: '1.5' }],
      xl: ['var(--font-size-xl)', { lineHeight: '1.5' }],
      '2xl': ['var(--font-size-2xl)', { lineHeight: '1.4' }],
      '3xl': ['var(--font-size-3xl)', { lineHeight: '1.3' }],
      '4xl': ['var(--font-size-4xl)', { lineHeight: '1.2' }]
    },
    fontWeight: {
      light: 'var(--font-light)',
      medium: 'var(--font-medium)',
      bold: 'var(--font-bold)'
    },
    borderRadius: {
      DEFAULT: 'var(--radius)',
      none: '0'
    },
    boxShadow: {
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      none: 'none'
    }
  },
  plugins: []
}
