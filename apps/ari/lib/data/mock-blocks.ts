import { Block } from '../types/block'

export const mockBlocks: Block[] = [
  {
    id: '1',
    code: 'BLOCK-2024-WEDDING',
    name: '김철수-이영희 결혼식',
    description: '2024년 5월 결혼식 하객 숙박 블록',
    type: 'event',
    startDate: new Date('2024-05-10'),
    endDate: new Date('2024-05-12'),
    releaseDate: new Date('2024-04-25'),
    cutoffDays: 15,
    rooms: [
      {
        roomTypeId: '1',
        roomTypeName: '스탠다드 더블',
        quantity: 30,
        remaining: 18,
        released: 0
      },
      {
        roomTypeId: '2',
        roomTypeName: '디럭스 트윈',
        quantity: 10,
        remaining: 7,
        released: 0
      }
    ],
    rateCode: 'WEDDING-SPECIAL',
    rateName: '결혼식 특가',
    specialRate: 120000,
    contactName: '김철수',
    contactEmail: 'kim@example.com',
    contactPhone: '010-1234-5678',
    organization: '김철수 웨딩',
    totalRooms: 40,
    bookedRooms: 15,
    availableRooms: 25,
    minLengthOfStay: 1,
    requiresDeposit: true,
    depositAmount: 50000,
    cancellationPolicy: '체크인 7일 전까지 무료 취소',
    notes: '결혼식은 5월 11일 오후 2시에 진행됩니다.',
    internalNotes: '웨딩팀과 협의하여 조식 뷔페 20% 할인 적용',
    status: 'active',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    code: 'CORP-SAMSUNG-2024',
    name: '삼성전자 기업 블록',
    description: '삼성전자 직원 출장 전용 블록',
    type: 'corporate',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    releaseDate: new Date('2024-12-15'),
    cutoffDays: 3,
    rooms: [
      {
        roomTypeId: '1',
        roomTypeName: '스탠다드 더블',
        quantity: 20,
        remaining: 12,
        released: 2
      },
      {
        roomTypeId: '3',
        roomTypeName: '비즈니스 더블',
        quantity: 15,
        remaining: 9,
        released: 1
      }
    ],
    rateCode: 'CORP01',
    rateName: '기업 할인 요금',
    specialRate: 100000,
    contactName: '박지민',
    contactEmail: 'park@samsung.com',
    contactPhone: '02-1234-5678',
    organization: '삼성전자',
    totalRooms: 35,
    bookedRooms: 11,
    availableRooms: 21,
    minLengthOfStay: 1,
    requiresDeposit: false,
    cancellationPolicy: '체크인 24시간 전까지 무료 취소',
    notes: '월 단위 사용 현황 리포트 발송 필요',
    internalNotes: '계약 갱신일: 2024년 12월 31일',
    status: 'active',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    code: 'GROUP-TOUR-JAPAN',
    name: '일본 단체 관광객',
    description: '일본 JTB 여행사 단체 투어',
    type: 'group',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-17'),
    releaseDate: new Date('2024-06-01'),
    cutoffDays: 14,
    rooms: [
      {
        roomTypeId: '2',
        roomTypeName: '디럭스 트윈',
        quantity: 25,
        remaining: 25,
        released: 0
      }
    ],
    rateCode: 'GROUP-10',
    rateName: '단체 할인',
    specialRate: 110000,
    contactName: 'Tanaka Yuki',
    contactEmail: 'tanaka@jtb.co.jp',
    contactPhone: '+81-3-1234-5678',
    organization: 'JTB Travel',
    totalRooms: 25,
    bookedRooms: 0,
    availableRooms: 25,
    minLengthOfStay: 2,
    requiresDeposit: true,
    depositAmount: 2750000,
    cancellationPolicy: '체크인 30일 전까지 무료 취소, 이후 전액 부과',
    notes: '일본어 가능한 직원 배정 요청',
    internalNotes: '조식 시간 07:00-08:00로 지정',
    status: 'active',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-05')
  },
  {
    id: '4',
    code: 'MAINT-2024-03',
    name: '3월 객실 정비',
    description: '스탠다드 더블 객실 리노베이션',
    type: 'maintenance',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-15'),
    rooms: [
      {
        roomTypeId: '1',
        roomTypeName: '스탠다드 더블',
        quantity: 15,
        remaining: 0,
        released: 0
      }
    ],
    totalRooms: 15,
    bookedRooms: 0,
    availableRooms: 0,
    notes: '객실 인테리어 및 가구 교체 작업',
    internalNotes: '공사 업체: ABC 인테리어, 담당자: 최민수 (010-9876-5432)',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '5',
    code: 'OWNER-PERSONAL',
    name: '오너 개인 사용',
    description: '호텔 오너 가족 및 지인 전용 블록',
    type: 'owner',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    rooms: [
      {
        roomTypeId: '4',
        roomTypeName: '프레지덴셜 스위트',
        quantity: 1,
        remaining: 1,
        released: 0
      },
      {
        roomTypeId: '5',
        roomTypeName: '로열 스위트',
        quantity: 2,
        remaining: 2,
        released: 0
      }
    ],
    totalRooms: 3,
    bookedRooms: 0,
    availableRooms: 3,
    notes: '예약 시 오너 승인 필요',
    internalNotes: '비용 청구하지 않음',
    status: 'active',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    code: 'CONF-2024-Q1',
    name: '2024 Q1 컨퍼런스',
    description: '국제 비즈니스 컨퍼런스 참가자 숙박',
    type: 'event',
    startDate: new Date('2024-03-20'),
    endDate: new Date('2024-03-23'),
    releaseDate: new Date('2024-03-10'),
    cutoffDays: 10,
    rooms: [
      {
        roomTypeId: '1',
        roomTypeName: '스탠다드 더블',
        quantity: 50,
        remaining: 15,
        released: 5
      },
      {
        roomTypeId: '3',
        roomTypeName: '비즈니스 더블',
        quantity: 30,
        remaining: 8,
        released: 2
      }
    ],
    rateCode: 'CONF-SPECIAL',
    rateName: '컨퍼런스 특가',
    specialRate: 130000,
    contactName: '정수진',
    contactEmail: 'jung@conference.com',
    contactPhone: '02-9876-5432',
    organization: '글로벌 비즈니스 협회',
    totalRooms: 80,
    bookedRooms: 50,
    availableRooms: 23,
    minLengthOfStay: 3,
    requiresDeposit: true,
    depositAmount: 10000000,
    cancellationPolicy: '체크인 14일 전까지 무료 취소',
    notes: '컨퍼런스 홀 동시 예약됨',
    internalNotes: '조식 뷔페 증설 필요, F&B팀 협의 완료',
    status: 'released',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10')
  }
]