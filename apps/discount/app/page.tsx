'use client'

import { Tag, Percent, TrendingUp, Users } from "lucide-react";
import { Card } from "@creami/ui";

export default function Dashboard() {
  const stats = [
    { icon: Tag, label: '활성 할인', value: '15', color: 'var(--primary)' },
    { icon: Percent, label: '평균 할인율', value: '18%', color: 'var(--success)' },
    { icon: TrendingUp, label: '할인 매출', value: '₩8.2M', color: 'var(--primary-dark)' },
    { icon: Users, label: '사용 고객', value: '523', color: 'var(--warning)' },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-lg font-bold text-text-primary">
        할인 대시보드
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
            공지사항
          </h2>
          <div className="space-y-sm">
            <p className="font-light text-text-secondary">
              Creami Discount에 오신 것을 환영합니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
