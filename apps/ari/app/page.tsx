import { BarChart3, Calendar, DollarSign, Package } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { icon: Package, label: '재고 현황', value: '95%', color: 'var(--primary)' },
    { icon: DollarSign, label: '평균 가격', value: '₩150,000', color: '#4ade80' },
    { icon: Calendar, label: '예약 가능일', value: '28일', color: '#60a5fa' },
    { icon: BarChart3, label: '점유율', value: '78%', color: '#f59e0b' },
  ];

  return (
    <div>
      <h1 className="text-3xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        ARI 대시보드
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }} className="text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            공지사항
          </h2>
          <div className="space-y-3">
            <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
              Creami ARI에 오신 것을 환영합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
