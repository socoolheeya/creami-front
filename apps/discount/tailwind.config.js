/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // 숫자 유틸리티 완전 제거 - 토큰만 사용
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        hover: 'var(--primary-hover)',
        active: 'var(--primary-active)',
        dark: 'var(--primary-dark)',
        bg: 'var(--primary-bg)',
      },
      success: {
        DEFAULT: 'var(--success)',
        bg: 'var(--success-bg)',
      },
      error: {
        DEFAULT: 'var(--error)',
        bg: 'var(--error-bg)',
      },
      bg: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
      },
      border: 'var(--border-color)',
      transparent: 'transparent',
      current: 'currentColor',
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
      '2xl': 'var(--spacing-2xl)',
      '3xl': 'var(--spacing-3xl)',
      0: '0',
      auto: 'auto',
    },
    fontSize: {
      xs: ['var(--font-size-xs)', { lineHeight: '1.5' }],
      sm: ['var(--font-size-sm)', { lineHeight: '1.5' }],
      base: ['var(--font-size-base)', { lineHeight: '1.5' }],
      lg: ['var(--font-size-lg)', { lineHeight: '1.5' }],
      xl: ['var(--font-size-xl)', { lineHeight: '1.5' }],
      '2xl': ['var(--font-size-2xl)', { lineHeight: '1.4' }],
      '3xl': ['var(--font-size-3xl)', { lineHeight: '1.3' }],
      '4xl': ['var(--font-size-4xl)', { lineHeight: '1.2' }],
    },
    fontWeight: {
      light: 'var(--font-light)',
      medium: 'var(--font-medium)',
      bold: 'var(--font-bold)',
    },
    borderRadius: {
      DEFAULT: 'var(--radius)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      full: 'var(--radius-full)',
      none: '0',
    },
    boxShadow: {
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      none: 'none',
    },
    extend: {
      // 레이아웃 유틸리티만 extend로 추가
      gap: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
    },
  },
  plugins: [],
}