'use client'

import Link from 'next/link'
import { RatePlan, RATE_PLAN_TYPE_LABELS, MEAL_PLAN_LABELS, RATE_PLAN_STATUS_LABELS } from '@/lib/types/rateplan'
import { Eye, Edit } from 'lucide-react'

interface RatePlanTableViewProps {
  ratePlans: RatePlan[]
}

export function RatePlanTableView({ ratePlans }: RatePlanTableViewProps) {
  if (ratePlans.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-text">요금제가 없습니다</p>
        <style jsx>{`
          .empty-state {
            text-align: center;
            padding: var(--spacing-xl);
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
          }

          .empty-text {
            font-size: var(--font-size-base);
            color: var(--text-secondary);
            margin: 0;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="rate-plan-table">
          <thead>
            <tr>
              <th>요금제명</th>
              <th>상태</th>
              <th>혜택명</th>
              <th>유형</th>
              <th>식사</th>
              <th className="hide-mobile">최소 숙박</th>
              <th className="hide-mobile">최대 숙박</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {ratePlans.map((ratePlan) => (
              <tr key={ratePlan.id} className="table-row">
                <td className="name-cell">
                  <div className="name-wrapper">
                    <span className="name-primary">{ratePlan.name}</span>
                    {ratePlan.enName && (
                      <span className="name-secondary">{ratePlan.enName}</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`badge badge-${ratePlan.status}`}>
                    {RATE_PLAN_STATUS_LABELS[ratePlan.status]}
                  </span>
                </td>
                <td className="benefit-cell">{ratePlan.benefitName}</td>
                <td className="type-cell">
                  {RATE_PLAN_TYPE_LABELS[ratePlan.ratePlanType]}
                </td>
                <td className="meal-cell">
                  {MEAL_PLAN_LABELS[ratePlan.mealPlan]}
                </td>
                <td className="hide-mobile centered">
                  {ratePlan.setting?.minLos || '-'}박
                </td>
                <td className="hide-mobile centered">
                  {ratePlan.setting?.maxLos || '-'}박
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      href={`/rateplans/${ratePlan.id}`}
                      className="action-btn view-btn"
                      title="상세보기"
                    >
                      <Eye className="action-icon" />
                    </Link>
                    <Link
                      href={`/rateplans/${ratePlan.id}/edit`}
                      className="action-btn edit-btn"
                      title="수정"
                    >
                      <Edit className="action-icon" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .rate-plan-table {
          width: 100%;
          border-collapse: collapse;
        }

        .rate-plan-table thead {
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-color);
        }

        .rate-plan-table th {
          padding: var(--spacing-md) var(--spacing-lg);
          text-align: left;
          font-size: var(--font-size-sm);
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .rate-plan-table td {
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .table-row {
          transition: background-color 0.2s;
        }

        .table-row:hover {
          background: var(--bg-tertiary);
        }

        .table-row:last-child td {
          border-bottom: none;
        }

        .name-cell {
          min-width: 200px;
        }

        .name-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .name-primary {
          font-weight: 700;
          color: var(--text-primary);
        }

        .name-secondary {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .benefit-cell {
          min-width: 150px;
          color: var(--primary);
          font-weight: 500;
        }

        .type-cell,
        .meal-cell {
          min-width: 120px;
          color: var(--text-secondary);
        }

        .centered {
          text-align: center;
        }

        .badge {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: 500;
          white-space: nowrap;
          display: inline-block;
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

        .action-buttons {
          display: flex;
          gap: var(--spacing-xs);
        }

        .action-btn {
          padding: var(--spacing-xs);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .action-btn:hover {
          background: var(--bg-tertiary);
        }

        .view-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .edit-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        :global(.action-btn .action-icon) {
          width: 16px;
          height: 16px;
          color: var(--text-secondary);
        }

        :global(.action-btn:hover .action-icon) {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .hide-mobile {
            display: none;
          }

          .rate-plan-table th,
          .rate-plan-table td {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .name-cell {
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  )
}