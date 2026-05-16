'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { mockRatePlans } from '@/lib/data/mock-rateplans'

interface RatePlanPageProps {
  params: Promise<{
    id: string
  }>
}

export default function RatePlanPage({ params }: RatePlanPageProps) {
  const t = useTranslations('accommodation.rateplans')
  const commonT = useTranslations('accommodation.common')
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
            <Link href="/rateplans">{t('title')}</Link>
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
            {commonT('edit')}
          </Link>
          <span className={`badge badge-${ratePlan.status}`}>
            {t(`statuses.${ratePlan.status}`)}
          </span>
        </div>
      </div>

      <div className="content-grid">
        {/* Basic Information */}
        <div className="section-card">
          <h2 className="section-title">{t('sections.basic')}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{t('fields.ratePlanId')}</span>
              <span className="info-value">{ratePlan.id}</span>
            </div>
            {ratePlan.roomId && (
              <div className="info-item">
                <span className="info-label">{t('fields.roomId')}</span>
                <span className="info-value">{ratePlan.roomId}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">{t('fields.ratePlanType')}</span>
              <span className="info-value">
                {t(`types.${ratePlan.ratePlanType}`)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('fields.mealIncluded')}</span>
              <span className="info-value">
                {t(`mealPlans.${ratePlan.mealPlan}`)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('fields.enabled')}</span>
              <span className="info-value">
                {ratePlan.enabled ? t('values.enabled') : t('values.disabled')}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('fields.status')}</span>
              <span className="info-value">
                {t(`statuses.${ratePlan.status}`)}
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
            <h2 className="section-title">{t('sections.benefit')}</h2>
          </div>
          <p className="benefit-text">{ratePlan.benefitName}</p>
        </div>

        {/* Description */}
        {ratePlan.description && (
          <div className="section-card full-width">
            <h2 className="section-title">{t('sections.description')}</h2>
            <div className="description-content">
              {ratePlan.description.description && (
                <div className="description-item">
                  <span className="description-label">{t('fields.descriptionKo')}</span>
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
            <h2 className="section-title">{t('sections.settings')}</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <h3 className="group-title">{t('sections.stay')}</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.minLos')}</span>
                    <span className="setting-value">
                      {commonT('night', { count: ratePlan.setting.minLos })}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.maxLos')}</span>
                    <span className="setting-value">
                      {commonT('night', { count: ratePlan.setting.maxLos })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">{t('sections.throughDays')}</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.minThroughDays')}</span>
                    <span className="setting-value">
                      {commonT('day', { count: ratePlan.setting.minThroughDays })}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.maxThroughDays')}</span>
                    <span className="setting-value">
                      {commonT('day', { count: ratePlan.setting.maxThroughDays })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">{t('sections.advance')}</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.minAdvanceDays')}</span>
                    <span className="setting-value">
                      {commonT('dayBefore', { count: ratePlan.setting.minAdvanceDays })}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.maxAdvanceDays')}</span>
                    <span className="setting-value">
                      {commonT('dayBefore', { count: ratePlan.setting.maxAdvanceDays })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">{t('sections.inventory')}</h3>
                <div className="setting-items">
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.allotment')}</span>
                    <span className="setting-value">
                      {ratePlan.setting.allotment}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.closedToArrival')}</span>
                    <span className="setting-value">
                      {ratePlan.setting.closedToArrival ? t('values.restricted') : t('values.allowed')}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-label">{t('fields.closedToDeparture')}</span>
                    <span className="setting-value">
                      {ratePlan.setting.closedToDeparture ? t('values.restricted') : t('values.allowed')}
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
            <h2 className="section-title">{t('sections.salePeriod')}</h2>
            <div className="period-grid">
              <div className="period-group">
                <h3 className="group-title">{t('sections.bookingPeriod')}</h3>
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
                <h3 className="group-title">{t('sections.stayPeriod')}</h3>
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
            <h2 className="section-title">{t('sections.cancellationPolicies')}</h2>
            <div className="policies-list">
              {ratePlan.cancellationPolicies.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <h3 className="policy-name">{policy.name}</h3>
                    <span className="policy-priority">
                      {t('fields.priority')} {policy.priority}
                    </span>
                  </div>

                  <div className="policy-period">
                    <span className="period-label">{t('fields.period')}</span>
                    <div className="period-range">
                      <span>{policy.startDateTime}</span>
                      <span className="period-separator">~</span>
                      <span>{policy.endDateTime}</span>
                    </div>
                  </div>

                  <div className="policy-days">
                    <span className="days-label">{t('fields.daysOfWeek')}</span>
                    <div className="days-grid">
                      <span className={policy.sunday ? 'day active' : 'day'}>
                        {t('weekdays.sunday')}
                      </span>
                      <span className={policy.monday ? 'day active' : 'day'}>
                        {t('weekdays.monday')}
                      </span>
                      <span className={policy.tuesday ? 'day active' : 'day'}>
                        {t('weekdays.tuesday')}
                      </span>
                      <span className={policy.wednesday ? 'day active' : 'day'}>
                        {t('weekdays.wednesday')}
                      </span>
                      <span className={policy.thursday ? 'day active' : 'day'}>
                        {t('weekdays.thursday')}
                      </span>
                      <span className={policy.friday ? 'day active' : 'day'}>
                        {t('weekdays.friday')}
                      </span>
                      <span className={policy.saturday ? 'day active' : 'day'}>
                        {t('weekdays.saturday')}
                      </span>
                    </div>
                  </div>

                  {policy.penalties.length > 0 && (
                    <div className="penalties-section">
                      <span className="penalties-label">{t('fields.penalty')}</span>
                      <div className="penalties-list">
                        {policy.penalties.map((penalty) => (
                          <div key={penalty.id} className="penalty-item">
                            <span className="penalty-days">
                              {commonT('dayBefore', { count: penalty.days })}
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
          <h2 className="section-title">{t('sections.metadata')}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{commonT('createdAt')}</span>
              <span className="info-value">
                {ratePlan.createdAt.toLocaleString()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">{commonT('updatedAt')}</span>
              <span className="info-value">
                {ratePlan.updatedAt.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: var(--spacing-md);
          max-width: var(--page-max-width);
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-lg);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xs);
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
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .page-subtitle {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: var(--spacing-xs) 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-xs);
          align-items: center;
        }

        .btn {
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-xs);
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
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
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
          gap: var(--spacing-md);
        }

        .section-card {
          background: var(--bg-secondary);
          border: var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
        }

        .section-card.full-width {
          grid-column: 1 / -1;
        }

        .section-card.highlight-card {
          background: var(--primary-bg);
          border-color: var(--primary);
        }

        .section-title {
          font-size: var(--font-size-base);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .benefit-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }

        .benefit-icon {
          width: var(--spacing-lg);
          height: var(--spacing-lg);
          color: var(--primary);
        }

        .benefit-text {
          font-size: var(--font-size-sm);
          color: var(--primary);
          font-weight: 600;
          margin: 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
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
          gap: var(--spacing-md);
        }

        .description-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
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
          gap: var(--spacing-lg);
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .group-title {
          font-size: var(--font-size-xs);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          padding-bottom: var(--spacing-xs);
          border-bottom: var(--border-strong);
        }

        .setting-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .setting-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .setting-value {
          font-size: var(--font-size-xs);
          color: var(--text-primary);
          font-weight: 600;
        }

        .period-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .period-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .period-range {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
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
          font-size: var(--font-size-xs);
          color: var(--text-primary);
          font-weight: 500;
        }

        .period-separator {
          color: var(--text-tertiary);
        }

        .policies-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .policy-card {
          border: var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          background: var(--bg-primary);
        }

        .policy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-sm);
          border-bottom: var(--border);
        }

        .policy-name {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .policy-priority {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          padding: var(--spacing-xs) var(--spacing-xs);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .policy-period {
          margin-bottom: var(--spacing-sm);
        }

        .policy-days {
          margin-bottom: var(--spacing-sm);
        }

        .days-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
          display: block;
          margin-bottom: var(--spacing-xs);
        }

        .days-grid {
          display: flex;
          gap: var(--spacing-xs);
        }

        .day {
          width: var(--spacing-xl);
          height: var(--spacing-xl);
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
          padding-top: var(--spacing-sm);
          border-top: var(--border);
        }

        .penalties-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
          display: block;
          margin-bottom: var(--spacing-xs);
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
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .penalty-days {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }

        .penalty-amount {
          font-size: var(--font-size-xs);
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
