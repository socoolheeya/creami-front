'use client'

import { use, useState } from 'react'
import { ArrowLeft, Edit, Trash2, DoorOpen, Building2, Layers, Maximize2, Users, Bed, Cigarette, Ban, Check, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { mockRooms } from '@/lib/data/mock-rooms'
import { ROOM_TYPE_LABELS, ROOM_STATUS_LABELS, VIEW_TYPE_LABELS, BED_TYPE_LABELS } from '@/lib/types/room'
import { ImageGallery } from './components/ImageGallery'

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const room = mockRooms.find(r => r.id === id)

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <DoorOpen className="w-16 h-16 mb-3" style={{ color: 'var(--text-tertiary)' }} />
        <h3 className="text-lg mb-1.5" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          객실을 찾을 수 없습니다
        </h3>
        <Link href="/rooms">
          <button
            className="mt-3 px-3 py-1.5 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    // TODO: Implement actual delete logic
    console.log('Delete room:', id)
    setShowDeleteModal(false)
    router.push('/rooms')
  }

  const statusColor =
    room.status === 'available' ? 'var(--primary)' :
    room.status === 'maintenance' ? 'var(--text-tertiary)' :
    'var(--text-tertiary)'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/rooms">
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              {room.name}
            </h1>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {ROOM_TYPE_LABELS[room.type]}
            </span>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: statusColor,
                color: '#ffffff',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {ROOM_STATUS_LABELS[room.status]}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/rooms/${room.id}/edit`}>
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Edit className="w-4 h-4" />
              수정
            </button>
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Trash2 className="w-4 h-4" />
            삭제
          </button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Image Gallery (1/2 width on desktop) */}
        <div>
          <ImageGallery images={room.images} roomName={room.name} />
        </div>

        {/* Right Column - Basic Info Cards (1/2 width on desktop) */}
        <div className="space-y-3">
          {/* Card 1: 기본 정보 */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-lg mb-3 flex items-center gap-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              <Building2 className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              기본 정보
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>숙소명</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>{room.accommodationName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>객실 타입</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>{ROOM_TYPE_LABELS[room.type]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>층수</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>{room.floor}층</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>객실 크기</span>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                    {room.size}{room.sizeUnit === 'sqm' ? '㎡' : '평'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>뷰 타입</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                  {VIEW_TYPE_LABELS[room.viewType]}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>흡연</span>
                <div className="flex items-center gap-1">
                  {room.smokingAllowed ? (
                    <>
                      <Cigarette className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>가능</span>
                    </>
                  ) : (
                    <>
                      <Ban className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>불가능</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 수용 인원 & 침대 */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 className="text-lg mb-3 flex items-center gap-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              <Users className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              수용 인원 & 침대
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>기준 인원</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>{room.standardOccupancy}명</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>최대 인원</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>{room.maxOccupancy}명</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>엑스트라 베드</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)' }}>
                  {room.extraBedAvailable ? `가능 (${room.extraBedCount}개)` : '불가능'}
                </span>
              </div>
              <div className="border-t pt-2" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>침대 구성</p>
                <div className="space-y-1.5">
                  {room.bedConfiguration.map((bed, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Bed className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-light)' }}>
                        {BED_TYPE_LABELS[bed.type]} {bed.count}개
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Width Sections Below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Card 4: 객실 편의시설 */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 className="text-lg mb-3 flex items-center gap-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            <Layers className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            객실 편의시설
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-light)' }}>
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: 장애인 편의시설 */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 className="text-lg mb-3 flex items-center gap-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            <DoorOpen className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            장애인 편의시설
          </h2>
          {room.accessibilityFeatures.length > 0 ? (
            <div className="space-y-1.5">
              {room.accessibilityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-light)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
              해당 없음
            </p>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>생성일: {room.createdAt.toLocaleDateString('ko-KR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>수정일: {room.updatedAt.toLocaleDateString('ko-KR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>생성자: {room.createdBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>수정자: {room.updatedBy}</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="p-4 rounded-lg max-w-md w-full mx-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg mb-3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              객실 삭제
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
              정말로 &quot;{room.name}&quot;을(를) 삭제하시겠습니까?<br />
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-sm rounded-lg"
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}