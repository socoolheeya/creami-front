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
      white: 'var(--text-on-primary)',
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
      'dropdown-sm': 'var(--dropdown-width-sm)',
      'dropdown-md': 'var(--dropdown-width-md)',
      'notification-menu': 'var(--notification-menu-width)',
      'notification-menu-max': 'var(--notification-menu-max-height)',
      'notification-indicator': 'var(--notification-indicator-size)',
      'notification-indicator-offset': 'var(--notification-indicator-offset)',
      'filter-min': 'var(--filter-min-width)',
      'filter-select': 'var(--filter-select-width)',
      'results-list': 'var(--results-list-height)',
      'policy-list': 'var(--policy-list-height)',
      'profile-avatar': 'var(--profile-avatar-size)',
      'profile-label': 'var(--profile-info-label-width)',
      'header': 'var(--header-height)',
      'sidebar': 'var(--sidebar-width)',
      'sidebar-collapsed': 'var(--sidebar-collapsed)',
      'sidebar-collapsed-active': 'calc(var(--sidebar-collapsed) - var(--spacing-lg))',
      'content-min': 'calc(100vh - var(--header-height))',
      'app-switcher-dropdown': 'var(--app-switcher-dropdown-height)',
      'table-col-id-9': 'var(--table-col-id-9-width)',
      'policy-col-id': 'var(--policy-col-id-width)',
      'policy-col-name': 'var(--policy-col-name-width)',
      'policy-col-status': 'var(--policy-col-status-width)',
      'policy-col-count': 'var(--policy-col-count-width)',
      'policy-col-date': 'var(--policy-col-date-width)',
      'permission-col-filter-action': 'var(--permission-col-filter-action-width)',
      'permission-col-role-id': 'var(--permission-col-role-id-width)',
      'permission-col-role-name': 'var(--permission-col-role-name-width)',
      'permission-col-description': 'var(--permission-col-description-width)',
      'permission-col-member-count': 'var(--permission-col-member-count-width)',
      'permission-col-date': 'var(--permission-col-date-width)',
      'member-col-name': 'var(--member-col-name-width)',
      'member-col-email': 'var(--member-col-email-width)',
      'member-col-phone': 'var(--member-col-phone-width)',
      'member-col-role': 'var(--member-col-role-width)',
      'member-col-status': 'var(--member-col-status-width)',
      'api-key-col-id': 'var(--api-key-col-id-width)',
      'api-key-col-supplier': 'var(--api-key-col-supplier-width)',
      'api-key-col-key': 'var(--api-key-col-key-width)',
      'api-key-col-date': 'var(--api-key-col-date-width)',
      'api-key-col-actions': 'var(--api-key-col-actions-width)',
      'supplier-col-id': 'var(--supplier-col-id-width)',
      'supplier-col-code': 'var(--supplier-col-code-width)',
      'supplier-col-name': 'var(--supplier-col-name-width)',
      'supplier-col-status': 'var(--supplier-col-status-width)',
      'supplier-col-block-time': 'var(--supplier-col-block-time-width)',
      'supplier-col-tps': 'var(--supplier-col-tps-width)',
      'supplier-col-user': 'var(--supplier-col-user-width)',
      'supplier-col-date': 'var(--supplier-col-date-width)',
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
