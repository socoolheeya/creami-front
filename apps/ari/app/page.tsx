import { BarChart3, Calendar, DollarSign, Package } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { icon: Package, label: '재고 현황', value: '95%', color: 'var(--primary)' },
    { icon: DollarSign, label: '평균 가격', value: '₩150,000', color: '#4ade80' },
    { icon: Calendar, label: '예약 가능일', value: '28일', color: '#60a5fa' },
    { icon: BarChart3, label: '점유율', value: '78%', color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        ARI 대시보드
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
            공지사항
          </h2>
          <div className="space-y-sm">
            <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
              Creami ARI에 오신 것을 환영합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
