'use client'

import Link from 'next/link'
import { mockRatePlans } from '@/lib/data/mock-rateplans'
import {
  RATE_PLAN_TYPE_LABELS,
  MEAL_PLAN_LABELS,
  RATE_PLAN_STATUS_LABELS
} from '@/lib/types/rateplan'

export default function RatePlansPage() {
  const ratePlans = mockRatePlans

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">요금제 관리</h1>
          <p className="page-description">
            객실별 요금제를 관리하고 할인 정책을 설정합니다
          </p>
        </div>
        <Link href="/rateplans/new" className="btn btn-primary">
          요금제 추가
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">전체 요금제</div>
          <div className="stat-value">{ratePlans.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">활성 요금제</div>
          <div className="stat-value">
            {ratePlans.filter(rp => rp.status === 'active').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">초안</div>
          <div className="stat-value">
            {ratePlans.filter(rp => rp.status === 'draft').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">비활성</div>
          <div className="stat-value">
            {ratePlans.filter(rp => rp.status === 'inactive').length}
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="rateplans-grid">
          {ratePlans.map((ratePlan) => (
            <Link
              key={ratePlan.id}
              href={`/rateplans/${ratePlan.id}`}
              className="rateplan-card"
            >
              <div className="rateplan-card-header">
                <div>
                  <h3 className="rateplan-name">{ratePlan.name}</h3>
                  {ratePlan.enName && (
                    <p className="rateplan-en-name">{ratePlan.enName}</p>
                  )}
                </div>
                <span className={`badge badge-${ratePlan.status}`}>
                  {RATE_PLAN_STATUS_LABELS[ratePlan.status]}
                </span>
              </div>

              <div className="rateplan-benefit">
                <svg
                  className="icon"
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
                <span>{ratePlan.benefitName}</span>
              </div>

              <div className="rateplan-info">
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
              </div>

              {ratePlan.setting && (
                <div className="rateplan-settings">
                  <div className="setting-item">
                    <span className="setting-label">최소 숙박</span>
                    <span className="setting-value">{ratePlan.setting.minLos}박</span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">최대 숙박</span>
                    <span className="setting-value">{ratePlan.setting.maxLos}박</span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">사전 예약</span>
                    <span className="setting-value">
                      {ratePlan.setting.minAdvanceDays}일 전
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">재고</span>
                    <span className="setting-value">{ratePlan.setting.allotment}</span>
                  </div>
                </div>
              )}

              {ratePlan.description?.description && (
                <p className="rateplan-description">
                  {ratePlan.description.description}
                </p>
              )}

              {ratePlan.salePeriod && (
                <div className="rateplan-period">
                  <div className="period-item">
                    <span className="period-label">예약 기간</span>
                    <span className="period-value">
                      {ratePlan.salePeriod.bookingStartDate} ~ {ratePlan.salePeriod.bookingEndDate}
                    </span>
                  </div>
                  <div className="period-item">
                    <span className="period-label">숙박 기간</span>
                    <span className="period-value">
                      {ratePlan.salePeriod.stayStartDate} ~ {ratePlan.salePeriod.stayEndDate}
                    </span>
                  </div>
                </div>
              )}
            </Link>
          ))}
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

        .page-title {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .page-description {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .stat-card {
          background: var(--bg-secondary);
          padding: var(--spacing-lg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xs);
        }

        .stat-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .content-section {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          border: 1px solid var(--border-color);
        }

        .rateplans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: var(--spacing-lg);
        }

        .rateplan-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .rateplan-card:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .rateplan-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-md);
        }

        .rateplan-name {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .rateplan-en-name {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
        }

        .badge {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: 500;
          white-space: nowrap;
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

        .rateplan-benefit {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--primary-bg);
          border-radius: var(--radius-md);
          color: var(--primary);
          font-size: var(--font-size-sm);
          font-weight: 500;
        }

        .icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .rateplan-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-sm);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .info-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .info-value {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: 500;
        }

        .rateplan-settings {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .setting-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          align-items: center;
          text-align: center;
        }

        .setting-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .setting-value {
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          font-weight: 600;
        }

        .rateplan-description {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .rateplan-period {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border-color);
        }

        .period-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .period-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .period-value {
          font-size: var(--font-size-xs);
          color: var(--text-primary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .rateplans-grid {
            grid-template-columns: 1fr;
          }

          .rateplan-settings {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}