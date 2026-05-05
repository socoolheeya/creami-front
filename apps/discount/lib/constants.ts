export const APPS = [
  {
    id: 'home',
    name: 'Creami Home',
    url: 'http://localhost:3000',
    icon: 'LayoutDashboard',
    color: '#fa8383'
  },
  {
    id: 'accommodation',
    name: 'Creami Accommodation',
    url: 'http://localhost:3001',
    icon: 'Home',
    color: '#fa8383'
  },
  {
    id: 'ari',
    name: 'Creami ARI',
    url: 'http://localhost:3002',
    icon: 'BarChart3',
    color: '#fa8383'
  },
  {
    id: 'discount',
    name: 'Creami Discount',
    url: 'http://localhost:3003',
    icon: 'Tag',
    color: '#fa8383'
  },
  {
    id: 'booking',
    name: 'Creami Booking',
    url: 'http://localhost:3004',
    icon: 'Calendar',
    color: '#fa8383'
  }
] as const

export const CURRENT_APP_ID = process.env.NEXT_PUBLIC_APP_ID || 'discount'

export const CURRENT_APP = APPS.find(app => app.id === CURRENT_APP_ID) || APPS[0]
