'use client'

import { Tag, Percent, TrendingUp, Users } from "lucide-react";
import { Card } from "@creami/ui";
import { useTranslations } from 'next-intl'

export default function Dashboard() {
  const t = useTranslations()
  const stats = [
    { icon: Tag, label: t('discount.dashboard.stats.activeDiscounts'), value: '15', color: 'var(--primary)' },
    { icon: Percent, label: t('discount.dashboard.stats.averageRate'), value: '18%', color: 'var(--success)' },
    { icon: TrendingUp, label: t('discount.dashboard.stats.discountRevenue'), value: '₩8.2M', color: 'var(--primary-dark)' },
    { icon: Users, label: t('discount.dashboard.stats.usedCustomers'), value: '523', color: 'var(--warning)' },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-lg font-bold text-text-primary">
        {t('discount.dashboard.title')}
      </h1>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4 mb-xl">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-lg"
              hover={false}
            >
              <div className="flex items-center justify-between mb-md">
                <div
                  className="flex h-control-lg w-control-lg items-center justify-center rounded bg-bg-tertiary"
                  style={{
                    color: stat.color
                  }}
                >
                  <Icon className="h-icon-lg w-icon-lg" />
                </div>
              </div>
              <div className="mb-xs text-base font-light text-text-secondary">
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-text-primary">
                {stat.value}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-lg">
        <Card className="p-lg" hover={false}>
          <h2 className="text-xl mb-md font-bold text-text-primary">
            {t('discount.dashboard.notice')}
          </h2>
          <div className="space-y-sm">
            <p className="font-light text-text-secondary">
              {t('discount.dashboard.welcome')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
