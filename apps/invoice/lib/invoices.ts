export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled'

export type InvoiceLineItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type Invoice = {
  id: string
  propertyName: string
  recipientName: string
  recipientEmail: string
  status: InvoiceStatus
  currency: 'KRW' | 'USD' | 'JPY'
  subtotal: number
  taxAmount: number
  totalAmount: number
  paidAmount: number
  issueDate: string
  dueDate: string
  paymentDate?: string
  createdBy: string
  memo: string
  lineItems: InvoiceLineItem[]
}

export const invoiceStatuses: InvoiceStatus[] = ['draft', 'issued', 'paid', 'overdue', 'cancelled']

export const invoices: Invoice[] = [
  {
    id: 'INV-2026-0001',
    propertyName: '추자도 여관',
    recipientName: 'Blue Coast Travel',
    recipientEmail: 'settlement@bluecoast.example',
    status: 'issued',
    currency: 'KRW',
    subtotal: 4200000,
    taxAmount: 420000,
    totalAmount: 4620000,
    paidAmount: 0,
    issueDate: '2026-05-01',
    dueDate: '2026-05-15',
    createdBy: 'system',
    memo: '5월 상반기 객실 판매분 송장',
    lineItems: [
      {
        id: 'ITEM-001',
        description: '객실 판매 정산',
        quantity: 28,
        unitPrice: 150000,
        amount: 4200000
      }
    ]
  },
  {
    id: 'INV-2026-0002',
    propertyName: '강릉 오션 리조트',
    recipientName: 'Ocean Partner',
    recipientEmail: 'finance@oceanpartner.example',
    status: 'paid',
    currency: 'KRW',
    subtotal: 8150000,
    taxAmount: 815000,
    totalAmount: 8965000,
    paidAmount: 8965000,
    issueDate: '2026-04-20',
    dueDate: '2026-05-05',
    paymentDate: '2026-05-03',
    createdBy: 'system',
    memo: '4월 객실 판매분 정산 완료',
    lineItems: [
      {
        id: 'ITEM-001',
        description: '객실 판매 정산',
        quantity: 50,
        unitPrice: 163000,
        amount: 8150000
      }
    ]
  },
  {
    id: 'INV-2026-0003',
    propertyName: '부산 스테이 게스트하우스',
    recipientName: 'Stay Network',
    recipientEmail: 'invoice@staynetwork.example',
    status: 'overdue',
    currency: 'KRW',
    subtotal: 2300000,
    taxAmount: 230000,
    totalAmount: 2530000,
    paidAmount: 0,
    issueDate: '2026-04-01',
    dueDate: '2026-04-20',
    createdBy: 'lee.wonhee',
    memo: '납기 초과 송장. 담당자 확인 필요',
    lineItems: [
      {
        id: 'ITEM-001',
        description: '객실 판매 정산',
        quantity: 20,
        unitPrice: 115000,
        amount: 2300000
      }
    ]
  },
  {
    id: 'INV-2026-0004',
    propertyName: '제주 바다 펜션',
    recipientName: 'Jeju Booking Desk',
    recipientEmail: 'accounting@jejubooking.example',
    status: 'draft',
    currency: 'KRW',
    subtotal: 1680000,
    taxAmount: 168000,
    totalAmount: 1848000,
    paidAmount: 0,
    issueDate: '2026-05-10',
    dueDate: '2026-05-24',
    createdBy: 'lee.wonhee',
    memo: '검토 후 발행 예정',
    lineItems: [
      {
        id: 'ITEM-001',
        description: '객실 판매 정산',
        quantity: 12,
        unitPrice: 140000,
        amount: 1680000
      }
    ]
  },
  {
    id: 'INV-2026-0005',
    propertyName: '서울 시티 호텔',
    recipientName: 'Metro Corporate',
    recipientEmail: 'billing@metro.example',
    status: 'cancelled',
    currency: 'KRW',
    subtotal: 980000,
    taxAmount: 98000,
    totalAmount: 1078000,
    paidAmount: 0,
    issueDate: '2026-03-15',
    dueDate: '2026-03-30',
    createdBy: 'system',
    memo: '중복 발행으로 취소',
    lineItems: [
      {
        id: 'ITEM-001',
        description: '객실 판매 정산',
        quantity: 7,
        unitPrice: 140000,
        amount: 980000
      }
    ]
  }
]

export function formatMoney(amount: number, currency: Invoice['currency'], locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'KRW' || currency === 'JPY' ? 0 : 2
  }).format(amount)
}

export function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value))
}
