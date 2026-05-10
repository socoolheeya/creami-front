import { ReceiptText, WalletCards, CircleDollarSign, FileCheck2 } from 'lucide-react'

const stats = [
  {
    icon: ReceiptText,
    label: '발행 대기',
    value: '18'
  },
  {
    icon: FileCheck2,
    label: '발행 완료',
    value: '132'
  },
  {
    icon: CircleDollarSign,
    label: '정산 금액',
    value: '₩48,200,000'
  },
  {
    icon: WalletCards,
    label: '미수 금액',
    value: '₩3,850,000'
  }
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-lg">
        <h1 className="mb-sm text-2xl font-bold text-text-primary">
          Creami Invoice
        </h1>
        <p className="text-base font-light text-text-secondary">
          청구, 정산, 발행 상태를 관리합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded border border-border bg-bg-primary p-lg shadow"
            >
              <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-primary text-white">
                <Icon className="h-icon-lg w-icon-lg" />
              </div>
              <p className="mb-xs text-base font-light text-text-secondary">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
