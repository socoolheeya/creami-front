import { Accommodation } from '../types/accommodation'

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: '그랜드 호텔 서울',
    enName: 'Grand Hotel Seoul',
    type: 'hotel',
    stars: 5,
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '테헤란빌딩 3-5층',
    city: '서울',
    countryCode: 'KR',
    zipCode: '06234',
    latitude: 37.5012,
    longitude: 127.0396,
    phone: '02-1234-5678',
    email: 'info@grandhotel.com',
    homepage: 'https://grandhotel-seoul.com',
    faxNumbers: ['02-1234-5679'],
    checkIn: '15:00',
    checkOut: '11:00',
    language: 'ko',
    roomCount: 250,
    floorCount: 15,
    description: '서울 강남 중심부에 위치한 럭셔리 비즈니스 호텔입니다. 최고급 서비스와 편안한 휴식을 제공합니다.',
    enDescription: 'A luxury business hotel located in the heart of Gangnam, Seoul. We provide top-class service and comfortable relaxation.',
    amenities: ['WiFi', '주차장', '조식', '피트니스', '비즈니스센터', '룸서비스'],
    images: [
      {
        id: '1-1',
        name: 'grand-hotel-exterior',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        isPrimary: true,
        sortOrder: 0,
        altText: '그랜드 호텔 서울 외관'
      },
      {
        id: '1-2',
        name: 'grand-hotel-lobby',
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        isPrimary: false,
        sortOrder: 1,
        altText: '그랜드 호텔 서울 로비'
      }
    ],
    billingPolicy: {
      currency: 'KRW',
      paymentMethod: '계좌이체',
      bankName: '신한은행',
      accountNumber: '110-123-456789',
      commission: {
        type: 'percentage',
        value: 10
      },
      surcharge: {
        type: 'percentage',
        value: 3
      },
      tax: {
        type: 'percentage',
        value: 10
      }
    },
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: '제주 바다 펜션',
    enName: 'Jeju Sea Pension',
    type: 'pension',
    stars: 3,
    address: '제주특별자치도 서귀포시 해안로 456',
    addressDetail: '2층',
    city: '서귀포',
    countryCode: 'KR',
    zipCode: '63598',
    latitude: 33.2541,
    longitude: 126.5601,
    phone: '064-789-0123',
    email: 'jeju@seapension.com',
    homepage: 'https://jejusea-pension.kr',
    checkIn: '14:00',
    checkOut: '11:00',
    language: 'ko',
    roomCount: 12,
    floorCount: 2,
    description: '제주 바다가 한눈에 보이는 아름다운 펜션입니다. 가족 단위 여행객에게 최적화되어 있습니다.',
    enDescription: 'A beautiful pension with ocean views. Optimized for family travelers.',
    amenities: ['WiFi', '주차장', '바베큐', '수영장'],
    images: [
      {
        id: '2-1',
        name: 'jeju-pension-view',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        isPrimary: true,
        sortOrder: 0,
        altText: '제주 바다 펜션 오션뷰'
      }
    ],
    billingPolicy: {
      currency: 'KRW',
      paymentMethod: '계좌이체',
      bankName: '우리은행',
      accountNumber: '1002-123-456789',
      commission: {
        type: 'percentage',
        value: 12
      },
      tax: {
        type: 'percentage',
        value: 10
      }
    },
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: '부산 스테이 게스트하우스',
    enName: 'Busan Stay Guesthouse',
    type: 'guesthouse',
    stars: 2,
    address: '부산광역시 해운대구 해변로 789',
    addressDetail: '3층',
    city: '부산',
    countryCode: 'KR',
    zipCode: '48099',
    latitude: 35.1587,
    longitude: 129.1603,
    phone: '051-456-7890',
    email: 'stay@busan-gh.com',
    homepage: 'https://busanstay-gh.com',
    checkIn: '15:00',
    checkOut: '10:00',
    language: 'ko',
    roomCount: 8,
    floorCount: 3,
    description: '해운대 해변 근처의 아늑한 게스트하우스입니다. 가성비 좋은 숙박을 원하시는 분들께 추천합니다.',
    enDescription: 'A cozy guesthouse near Haeundae Beach. Recommended for budget travelers.',
    amenities: ['WiFi', '공용 주방', '세탁 서비스'],
    images: [
      {
        id: '3-1',
        name: 'busan-guesthouse-room',
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        isPrimary: true,
        sortOrder: 0,
        altText: '부산 스테이 게스트하우스 객실'
      }
    ],
    billingPolicy: {
      currency: 'KRW',
      paymentMethod: '현금',
      commission: {
        type: 'fixed',
        value: 5000
      }
    },
    status: 'active',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  }
]
