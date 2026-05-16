'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Terminal, AlertCircle, Check } from 'lucide-react'
import { createBooking } from '@/lib/api/bookings'
import type { CreateBookingRequest } from '@/lib/types/search'

export default function CurlBookingPage() {
  const router = useRouter()
  const [curlCommand, setCurlCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parseCurlCommand = (curl: string): CreateBookingRequest | null => {
    try {
      // cURL 명령어에서 JSON 데이터 추출
      const dataMatch = curl.match(/--data(?:-raw)?\s+['"]([\s\S]+)['"]/) || curl.match(/-d\s+['"]([\s\S]+)['"]/)

      if (!dataMatch) {
        throw new Error('cURL 명령어에서 데이터를 찾을 수 없습니다')
      }

      const jsonStr = dataMatch[1]
        .replace(/\\n/g, '')
        .replace(/\\\"/g, '"')
        .trim()

      const data = JSON.parse(jsonStr)

      // 필수 필드 검증
      if (!data.accommodationId || !data.roomId || !data.ratePlanId || !data.checkIn || !data.checkOut || !data.occupancies || !data.guestName || !data.guestEmail || !data.guestPhone) {
        throw new Error('필수 필드가 누락되었습니다')
      }

      return data as CreateBookingRequest
    } catch (err) {
      console.error('파싱 오류:', err)
      return null
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setIsProcessing(true)

    try {
      const requestData = parseCurlCommand(curlCommand)

      if (!requestData) {
        setError('cURL 명령어 형식이 올바르지 않습니다. JSON 데이터를 확인해주세요.')
        setIsProcessing(false)
        return
      }

      const booking = await createBooking(requestData)
      alert(`예약이 완료되었습니다!\n예약번호: ${booking.bookingNumber}`)
      router.push(`/bookings/${booking.id}`)
    } catch (err) {
      setError('예약 처리 중 오류가 발생했습니다: ' + (err as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const exampleCurl = `curl -X POST http://localhost:3000/api/bookings \\
  -H "Content-Type: application/json" \\
  --data '{
    "accommodationId": "1",
    "accommodationName": "CREAMI 호텔",
    "roomId": "1",
    "roomName": "디럭스 더블룸",
    "ratePlanId": "1",
    "ratePlanName": "기본 요금제",
    "checkIn": "2026-06-01",
    "checkOut": "2026-06-03",
    "occupancies": [
      {
        "roomNumber": 1,
        "adults": 2,
        "children": []
      }
    ],
    "guestName": "홍길동",
    "guestEmail": "hong@example.com",
    "guestPhone": "010-1234-5678",
    "totalPrice": 200000,
    "specialRequests": "금연 객실"
  }'`

  return (
    <div>
      {/* Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-md mb-sm">
          <Terminal className="w-xl h-xl" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            cURL 예약 (개발자용)
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Postman이나 다른 도구에서 복사한 cURL 명령어를 붙여넣어 예약을 생성합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* 왼쪽: 입력 */}
        <div>
          <div
            className="p-lg rounded mb-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)'
            }}
          >
            <label className="block mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              cURL 명령어 붙여넣기
            </label>

            <textarea
              value={curlCommand}
              onChange={(e) => setCurlCommand(e.target.value)}
              placeholder="curl 명령어를 여기에 붙여넣으세요..."
              rows={15}
              className="w-full px-md py-md rounded font-mono text-base"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: 'var(--border)',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />

            {error && (
              <div
                className="mt-md p-md rounded flex items-start gap-sm"
                style={{
                  backgroundColor: 'var(--error-bg)',
                  border: 'var(--border-error)'
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--error)' }} />
                <p style={{ color: 'var(--error)', fontSize: 'var(--font-size-base)' }}>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!curlCommand.trim() || isProcessing}
              className="w-full mt-md flex items-center justify-center gap-sm px-md py-md rounded transition-colors"
              style={{
                backgroundColor: (!curlCommand.trim() || isProcessing) ? 'var(--text-tertiary)' : 'var(--primary)',
                color: 'var(--text-on-primary)',
                fontWeight: 'var(--font-bold)',
                cursor: (!curlCommand.trim() || isProcessing) ? 'not-allowed' : 'pointer'
              }}
            >
              <Check className="w-5 h-5" />
              {isProcessing ? '처리 중...' : '예약 생성'}
            </button>
          </div>
        </div>

        {/* 오른쪽: 예시 */}
        <div>
          <div
            className="p-lg rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)'
            }}
          >
            <h3 className="mb-md" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              cURL 예시
            </h3>

            <p className="mb-md" style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)' }}>
              아래 형식의 cURL 명령어를 사용하세요:
            </p>

            <pre
              className="p-md rounded overflow-x-auto"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: 'var(--border)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: '1.6'
              }}
            >
              <code style={{ color: 'var(--text-primary)' }}>{exampleCurl}</code>
            </pre>

            <div className="mt-md p-md rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h4 className="mb-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}>
                필수 필드
              </h4>
              <ul className="space-y-xs" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                <li>• accommodationId: 숙소 ID</li>
                <li>• roomId: 객실 ID</li>
                <li>• ratePlanId: 요금제 ID</li>
                <li>• checkIn: 체크인 날짜 (YYYY-MM-DD)</li>
                <li>• checkOut: 체크아웃 날짜 (YYYY-MM-DD)</li>
                <li>• occupancies: 인원 정보 배열</li>
                <li>• guestName: 예약자 이름</li>
                <li>• guestEmail: 예약자 이메일</li>
                <li>• guestPhone: 예약자 전화번호</li>
              </ul>
            </div>

            <div className="mt-md p-md rounded" style={{ backgroundColor: 'var(--primary-bg)', border: 'var(--border-primary)' }}>
              <h4 className="mb-sm flex items-center gap-sm" style={{ fontWeight: 'var(--font-bold)', color: 'var(--primary)', fontSize: 'var(--font-size-base)' }}>
                <AlertCircle className="w-md h-md" />
                주의사항
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                이 기능은 개발 및 테스트 목적으로만 사용하세요. 프로덕션 환경에서는 보안에 주의해야 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
