import { Home, Calendar, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { icon: Home, label: '총 객실', value: '48', color: 'var(--primary)' },
    { icon: Calendar, label: '오늘 예약', value: '23', color: '#4ade80' },
    { icon: Users, label: '총 고객', value: '1,247', color: '#60a5fa' },
    { icon: TrendingUp, label: '이번 달 매출', value: '₩12.5M', color: '#f59e0b' },
  ];

  return (
    <div>
      <h1 className="text-3xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        대시보드
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 className="text-xl mb-4" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            최근 예약
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      고객명 {i}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }} className="text-sm mt-1">
                      객실 10{i} · 2박 3일
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    확정
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
              Creami Accommodation에 오신 것을 환영합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
