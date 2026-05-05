'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import {
  RATE_PLAN_TYPE_LABELS,
  MEAL_PLAN_LABELS,
  RATE_PLAN_STATUS_LABELS
} from '@/lib/types/rateplan'

interface RatePlanPageProps {
  params: Promise<{
    id: string
  }>
}

export default function RatePlanPage({ params }: RatePlanPageProps) {
  const { id } = use(params)
  const ratePlan = mockRatePlans.find(rp => rp.id === id)

  if (!ratePlan) {
    notFound()
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/rateplans">요금제 관리</Link>
            <span className="separator">/</span>
            <span>{ratePlan.name}</span>
          </div>
          <h1 className="page-title">{ratePlan.name}</h1>
          {ratePlan.enName && (
            <p className="page-subtitle">{ratePlan.enName}</p>
          )}
        </div>
        <div className="header-actions">
          <Link href={`/rateplans/${id}/edit`} className="btn btn-primary">
            수정
          </Link>
          <span className={`badge badge-${ratePlan.status}`}>
            {RATE_PLAN_STATUS_LABELS[ratePlan.status]}
          </span>
        </div>
      </div>

      <div className="content-grid">
        {/* Basic Information */}
        <div className="section-card">
          <h2 className="section-title">기본 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">요금제 ID</span>
              <span className="info-value">{ratePlan.id}</span>
            </div>
            {ratePlan.roomId && (
              <div className="info-item">
                <span className="info-label">객실 ID</span>
                <span className="info-value">{ratePlan.roomId}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">요금제 유형</span>
              <span className="info-value">
                {RATE_PLAN_TYPE_LABELS[ratePlan.ratePlanType]}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">식사 포함</span>
              <span className="info-value">
                {MEAL_PLAN_LABELS[ratePlan.mealPlan]}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">활성 여부</span>
              <span className="info-value">
                {ratePlan.enabled ? '활성' : '비활성'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">상태</span>
              <span className="info-value">
                {RATE_PLAN_STATUS_LABELS[ratePlan.status]}
              </span>
            </div>
          </div>
        </div>

        {/* Benefit */}
        <div className="section-card highlight-card">
          <div className="benefit-header">
            <svg
              className="benefit-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="section-title">혜택</h2>
          </div>
          <p className="benefit-text">{ratePlan.benefitName}</p>
        </div>

        {/* Description */}
        {ratePlan.description && (
          <div className="section-card full-width">
            <h2 className="section-title">설명</h2>
            <div className="description-content">
              {ratePlan.description.description && (
                <div className="description-item">
                  <span className="description-label">한글</span>
                  <p className="description-text">
                    {ratePlan.description.description}
                  </p>
                </div>
              )}
              {ratePlan.description.enDescription && (
                <div className="description-item">
                  <span className="description-label">English</span>
                  <p className="description-text">
                    {ratePlan.description.enDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings */}
        {ratePlan.setting && (
          <div className="section-card full-width">
            <h2 className="section-title">요금제 설정</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <h3 className="group-title">숙박 기간</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">최소 숙박</span>
                    <span className="setting-value">
                      {ratePlan.setting.minLos}박
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">최대 숙박</span>
                    <span className="setting-value">
                      {ratePlan.setting.maxLos}박
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">체류 일수</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">최소 체류</span>
                    <span className="setting-value">
                      {ratePlan.setting.minThroughDays}일
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">최대 체류</span>
                    <span className="setting-value">
                      {ratePlan.setting.maxThroughDays}일
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">사전 예약</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">최소 사전 예약</span>
                    <span className="setting-value">
                      {ratePlan.setting.minAdvanceDays}일 전
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">최대 사전 예약</span>
                    <span className="setting-value">
                      {ratePlan.setting.maxAdvanceDays}일 전
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">재고 및 제한</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">배정 재고</span>
                    <span className="setting-value">
                      {ratePlan.setting.allotment}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">입실 제한</span>
                    <span className="setting-value">
                      {ratePlan.setting.closedToArrival ? '제한' : '허용'}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">퇴실 제한</span>
                    <span className="setting-value">
                      {ratePlan.setting.closedToDeparture ? '제한' : '허용'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sale Period */}
        {ratePlan.salePeriod && (
          <div className="section-card full-width">
            <h2 className="section-title">판매 기간</h2>
            <div className="period-grid">
              <div className="period-group">
                <h3 className="group-title">예약 가능 기간</h3>
                <div className="period-range">
                  <span className="period-date">
                    {ratePlan.salePeriod.bookingStartDate}
                  </span>
                  <span className="period-separator">~</span>
                  <span className="period-date">
                    {ratePlan.salePeriod.bookingEndDate}
                  </span>
                </div>
              </div>
              <div className="period-group">
                <h3 className="group-title">숙박 가능 기간</h3>
                <div className="period-range">
                  <span className="period-date">
                    {ratePlan.salePeriod.stayStartDate}
                  </span>
                  <span className="period-separator">~</span>
                  <span className="period-date">
                    {ratePlan.salePeriod.stayEndDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Policies */}
        {ratePlan.cancellationPolicies.length > 0 && (
          <div className="section-card full-width">
            <h2 className="section-title">취소 정책</h2>
            <div className="policies-list">
              {ratePlan.cancellationPolicies.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <h3 className="policy-name">{policy.name}</h3>
                    <span className="policy-priority">
                      우선순위 {policy.priority}
                    </span>
                  </div>

                  <div className="policy-period">
                    <span className="period-label">적용 기간</span>
                    <div className="period-range">
                      <span>{policy.startDateTime}</span>
                      <span className="period-separator">~</span>
                      <span>{policy.endDateTime}</span>
                    </div>
                  </div>

                  <div className="policy-days">
                    <span className="days-label">적용 요일</span>
                    <div className="days-grid">
                      <span className={policy.sunday ? 'day active' : 'day'}>
                        일
                      </span>
                      <span className={policy.monday ? 'day active' : 'day'}>
                        월
                      </span>
                      <span className={policy.tuesday ? 'day active' : 'day'}>
                        화
                      </span>
                      <span className={policy.wednesday ? 'day active' : 'day'}>
                        수
                      </span>
                      <span className={policy.thursday ? 'day active' : 'day'}>
                        목
                      </span>
                      <span className={policy.friday ? 'day active' : 'day'}>
                        금
                      </span>
                      <span className={policy.saturday ? 'day active' : 'day'}>
                        토
                      </span>
                    </div>
                  </div>

                  {policy.penalties.length > 0 && (
                    <div className="penalties-section">
                      <span className="penalties-label">위약금</span>
                      <div className="penalties-list">
                        {policy.penalties.map((penalty) => (
                          <div key={penalty.id} className="penalty-item">
                            <span className="penalty-days">
                              {penalty.days}일 전
                            </span>
                            <span className="penalty-amount">
                              {penalty.unit === 'percentage'
                                ? `${penalty.amount}%`
                                : `${penalty.amount}${penalty.currencyUnit || ''}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="section-card full-width">
          <h2 className="section-title">메타데이터</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">생성일</span>
              <span className="info-value">
                {ratePlan.createdAt.toLocaleString('ko-KR')}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">수정일</span>
              <span className="info-value">
                {ratePlan.updatedAt.toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: var(--spacing-lg);
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-xl);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-sm);
        }

        .breadcrumb a {
          color: var(--primary);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .separator {
          color: var(--text-tertiary);
        }

        .page-title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .page-subtitle {
          font-size: var(--font-size-md);
          color: var(--text-secondary);
          margin: var(--spacing-xs) 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-sm);
          align-items: center;
        }

        .btn {
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .badge {
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: 500;
        }

        .badge-active {
          background: var(--success-bg);
          color: var(--success);
        }

        .badge-draft {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .badge-inactive {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
        }

        .badge-archived {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .section-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
        }

        .section-card.full-width {
          grid-column: 1 / -1;
        }

        .section-card.highlight-card {
          background: var(--primary-bg);
          border-color: var(--primary);
        }

        .section-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-lg) 0;
        }

        .benefit-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .benefit-icon {
          width: 24px;
          height: 24px;
          color: var(--primary);
        }

        .benefit-text {
          font-size: var(--font-size-md);
          color: var(--primary);
          font-weight: 600;
          margin: 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .info-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .info-value {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
        }

        .description-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .description-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .description-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
        }

        .description-text {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          line-height: 1.6;
          margin: 0;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-xl);
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .group-title {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          padding-bottom: var(--spacing-xs);
          border-bottom: 2px solid var(--border-color);
        }

        .setting-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .setting-label {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .setting-value {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: 600;
        }

        .period-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-xl);
        }

        .period-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .period-range {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .period-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }

        .period-date {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: 500;
        }

        .period-separator {
          color: var(--text-tertiary);
        }

        .policies-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .policy-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          background: var(--bg-primary);
        }

        .policy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-color);
        }

        .policy-name {
          font-size: var(--font-size-md);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .policy-priority {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .policy-period {
          margin-bottom: var(--spacing-md);
        }

        .policy-days {
          margin-bottom: var(--spacing-md);
        }

        .days-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
          display: block;
          margin-bottom: var(--spacing-sm);
        }

        .days-grid {
          display: flex;
          gap: var(--spacing-xs);
        }

        .day {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          font-weight: 500;
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
        }

        .day.active {
          background: var(--primary-bg);
          color: var(--primary);
          font-weight: 600;
        }

        .penalties-section {
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-color);
        }

        .penalties-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
          display: block;
          margin-bottom: var(--spacing-sm);
        }

        .penalties-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .penalty-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .penalty-days {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .penalty-amount {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .settings-grid,
          .period-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }

          .header-actions {
            flex-direction: column;
            align-items: flex-end;
          }
        }
      `}</style>
    </div>
  )
}