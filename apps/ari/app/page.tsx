 'use client'

import { BarChart3, Calendar, DollarSign, Package } from "lucide-react";
import { useTranslations } from 'next-intl'

export default function Dashboard() {
  const t = useTranslations()
  const stats = [
    { icon: Package, label: t('ari.dashboard.stats.inventory'), value: '95%', color: 'var(--primary)' },
    { icon: DollarSign, label: t('ari.dashboard.stats.averagePrice'), value: '₩150,000', color: '#4ade80' },
    { icon: Calendar, label: t('ari.dashboard.stats.availableDays'), value: t('ari.common.days', { count: 28 }), color: '#60a5fa' },
    { icon: BarChart3, label: t('ari.dashboard.stats.occupancy'), value: '78%', color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        {t('ari.dashboard.title')}
      </h1>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded p-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="mb-md flex items-center justify-between">
                <div
                  className="rounded p-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <Icon className="h-xl w-xl" style={{ color: stat.color }} />
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }} className="mb-xs text-base">
                {stat.label}
              </div>
              <div className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-lg">
        <div
          className="rounded p-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 className="mb-md text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {t('ari.dashboard.notice')}
          </h2>
          <div className="space-y-sm">
            <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
              {t('ari.dashboard.welcome')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
