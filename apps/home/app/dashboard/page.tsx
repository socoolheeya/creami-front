'use client'

import { Building2, Calendar, BarChart3, Tag, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      icon: Building2,
      label: '등록된 숙소',
      value: '24',
      change: '+2',
      changeType: 'positive' as const
    },
    {
      icon: Calendar,
      label: '금일 예약',
      value: '156',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      icon: Users,
      label: '활성 사용자',
      value: '1,234',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      icon: DollarSign,
      label: '총 수익',
      value: '₩12,345,000',
      change: '+8%',
      changeType: 'positive' as const
    }
  ]

  const quickLinks = [
    {
      icon: Building2,
      label: '숙소 관리',
      description: '숙소를 관리하고 새로운 숙소를 등록하세요',
      url: 'http://localhost:3001/properties',
      color: 'var(--primary)'
    },
    {
      icon: Calendar,
      label: '예약 관리',
      description: '예약을 확인하고 관리하세요',
      url: 'http://localhost:3002',
      color: 'var(--primary)'
    },
    {
      icon: BarChart3,
      label: 'ARI 관리',
      description: '재고 및 요금을 관리하세요',
      url: 'http://localhost:3003',
      color: 'var(--primary)'
    },
    {
      icon: Tag,
      label: '할인 관리',
      description: '할인 정책을 설정하고 관리하세요',
      url: 'http://localhost:3004',
      color: 'var(--primary)'
    }
  ]

  return (
    <div>
      <div className="mb-xl">
        <h1 className="text-2xl mb-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          대시보드
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Creami 플랫폼의 주요 지표와 빠른 링크
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="p-lg rounded"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius)',
                border: 'var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-start justify-between mb-md">
                <div
                  className="p-md rounded"
                  style={{
                    backgroundColor: 'var(--primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Icon className="w-lg h-lg" style={{ color: 'var(--text-on-primary)' }} />
                </div>
                <div
                  className="px-sm py-xs rounded text-xs"
                  style={{
                    backgroundColor: stat.changeType === 'positive' ? 'var(--success-bg)' : 'var(--error-bg)',
                    color: stat.changeType === 'positive' ? 'var(--success)' : 'var(--error)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {stat.change}
                </div>
              </div>
              <div>
                <div
                  className="text-2xl mb-xs"
                  style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-base"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2
          className="text-xl mb-md"
          style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
        >
          빠른 링크
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.url}
                className="p-lg rounded transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius)',
                  border: 'var(--border)',
                  boxShadow: 'var(--shadow)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'var(--hover-lift-transform)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow)'
                }}
              >
                <div
                  className="w-3xl h-3xl rounded flex items-center justify-center mb-md"
                  style={{
                    backgroundColor: link.color,
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Icon className="w-lg h-lg" style={{ color: 'var(--text-on-primary)' }} />
                </div>
                <h3
                  className="text-lg mb-sm"
                  style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}
                >
                  {link.label}
                </h3>
                <p
                  className="text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.description}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
