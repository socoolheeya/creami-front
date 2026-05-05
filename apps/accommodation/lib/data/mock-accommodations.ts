import { Accommodation } from '../types/accommodation'

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: '그랜드 호텔 서울',
    type: 'hotel',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    email: 'info@grandhotel.com',
    checkIn: '15:00',
    checkOut: '11:00',
    description: '서울 강남 중심부에 위치한 럭셔리 비즈니스 호텔입니다. 최고급 서비스와 편안한 휴식을 제공합니다.',
    amenities: ['WiFi', '주차장', '조식', '피트니스', '비즈니스센터', '룸서비스'],
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        isPrimary: true,
        order: 0
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        isPrimary: false,
        order: 1
      }
    ],
    billingPolicy: {
      cancellationPolicy: '체크인 7일 전까지 무료 취소 가능합니다.',
      depositPolicy: '체크인 시 보증금 100,000원이 필요합니다.',
      paymentMethods: ['현금', '신용카드', '체크카드']
    },
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: '제주 바다 펜션',
    type: 'pension',
    address: '제주특별자치도 서귀포시 해안로 456',
    phone: '064-789-0123',
    email: 'jeju@seapension.com',
    checkIn: '14:00',
    checkOut: '11:00',
    description: '제주 바다가 한눈에 보이는 아름다운 펜션입니다. 가족 단위 여행객에게 최적화되어 있습니다.',
    amenities: ['WiFi', '주차장', '바베큐', '수영장'],
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    billingPolicy: {
      cancellationPolicy: '체크인 3일 전까지 무료 취소 가능합니다.',
      depositPolicy: '예약 시 30% 선결제가 필요합니다.',
      paymentMethods: ['현금', '계좌이체', '카드']
    },
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: '부산 스테이 게스트하우스',
    type: 'guesthouse',
    address: '부산광역시 해운대구 해변로 789',
    phone: '051-456-7890',
    email: 'stay@busan-gh.com',
    checkIn: '15:00',
    checkOut: '10:00',
    description: '해운대 해변 근처의 아늑한 게스트하우스입니다. 가성비 좋은 숙박을 원하시는 분들께 추천합니다.',
    amenities: ['WiFi', '공용 주방', '세탁 서비스'],
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        isPrimary: true,
        order: 0
      }
    ],
    billingPolicy: {
      cancellationPolicy: '체크인 1일 전까지 무료 취소 가능합니다.',
      depositPolicy: '보증금이 필요하지 않습니다.',
      paymentMethods: ['현금', '카드', '간편결제']
    },
    status: 'active',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  }
]
