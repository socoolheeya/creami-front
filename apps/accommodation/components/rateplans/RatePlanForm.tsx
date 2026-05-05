'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type {
  RatePlan,
  RatePlanType,
  RatePlanStatus,
  MealPlan,
  RatePlanCancellationPolicy,
  RatePlanCancellationPenalty,
  CancellationPenaltyUnit
} from '@/lib/types/rateplan'
import {
  RATE_PLAN_TYPE_LABELS,
  MEAL_PLAN_LABELS,
  RATE_PLAN_STATUS_LABELS
} from '@/lib/types/rateplan'

interface RatePlanFormProps {
  initialData?: RatePlan
}

export default function RatePlanForm({ initialData }: RatePlanFormProps) {
  const router = useRouter()
  const isEdit = !!initialData

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    enName: initialData?.enName || '',
    benefitName: initialData?.benefitName || '',
    ratePlanType: initialData?.ratePlanType || 'standalone' as RatePlanType,
    status: initialData?.status || 'draft' as RatePlanStatus,
    mealPlan: initialData?.mealPlan || 'none' as MealPlan,
    enabled: initialData?.enabled ?? true,
    roomId: initialData?.roomId || '',

    // Description
    description: initialData?.description?.description || '',
    enDescription: initialData?.description?.enDescription || '',

    // Settings
    allotment: initialData?.setting?.allotment || 0,
    minLos: initialData?.setting?.minLos || 1,
    maxLos: initialData?.setting?.maxLos || 30,
    minThroughDays: initialData?.setting?.minThroughDays || 0,
    maxThroughDays: initialData?.setting?.maxThroughDays || 0,
    minAdvanceDays: initialData?.setting?.minAdvanceDays || 0,
    maxAdvanceDays: initialData?.setting?.maxAdvanceDays || 365,
    closedToArrival: initialData?.setting?.closedToArrival || false,
    closedToDeparture: initialData?.setting?.closedToDeparture || false,

    // Sale Period
    bookingStartDate: initialData?.salePeriod?.bookingStartDate || '',
    bookingEndDate: initialData?.salePeriod?.bookingEndDate || '',
    stayStartDate: initialData?.salePeriod?.stayStartDate || '',
    stayEndDate: initialData?.salePeriod?.stayEndDate || '',
  })

  const [cancellationPolicies, setCancellationPolicies] = useState<RatePlanCancellationPolicy[]>(
    initialData?.cancellationPolicies || []
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send data to your API
    console.log('Submitting rateplan:', { formData, cancellationPolicies })

    // Navigate back to list or detail page
    router.push(isEdit ? `/rateplans/${initialData.id}` : '/rateplans')
  }

  const addCancellationPolicy = () => {
    const newPolicy: RatePlanCancellationPolicy = {
      id: `policy-${Date.now()}`,
      name: '',
      startDateTime: '',
      endDateTime: '',
      priority: cancellationPolicies.length + 1,
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      penalties: []
    }
    setCancellationPolicies([...cancellationPolicies, newPolicy])
  }

  const removeCancellationPolicy = (index: number) => {
    setCancellationPolicies(cancellationPolicies.filter((_, i) => i !== index))
  }

  const updateCancellationPolicy = (index: number, updates: Partial<RatePlanCancellationPolicy>) => {
    const updated = [...cancellationPolicies]
    updated[index] = { ...updated[index], ...updates }
    setCancellationPolicies(updated)
  }

  const addPenalty = (policyIndex: number) => {
    const newPenalty: RatePlanCancellationPenalty = {
      id: `penalty-${Date.now()}`,
      days: 0,
      unit: 'percentage',
      amount: 0,
      currencyUnit: 'KRW'
    }
    const updated = [...cancellationPolicies]
    updated[policyIndex].penalties = [...updated[policyIndex].penalties, newPenalty]
    setCancellationPolicies(updated)
  }

  const removePenalty = (policyIndex: number, penaltyIndex: number) => {
    const updated = [...cancellationPolicies]
    updated[policyIndex].penalties = updated[policyIndex].penalties.filter((_, i) => i !== penaltyIndex)
    setCancellationPolicies(updated)
  }

  const updatePenalty = (
    policyIndex: number,
    penaltyIndex: number,
    updates: Partial<RatePlanCancellationPenalty>
  ) => {
    const updated = [...cancellationPolicies]
    updated[policyIndex].penalties[penaltyIndex] = {
      ...updated[policyIndex].penalties[penaltyIndex],
      ...updates
    }
    setCancellationPolicies(updated)
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/rateplans">요금제 관리</Link>
            <span className="separator">/</span>
            <span>{isEdit ? '수정' : '새 요금제'}</span>
          </div>
          <h1 className="page-title">
            {isEdit ? '요금제 수정' : '새 요금제 추가'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Basic Information */}
        <div className="form-section">
          <h2 className="section-title">기본 정보</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                요금제 이름
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="enName" className="form-label">
                영문 이름
              </label>
              <input
                type="text"
                id="enName"
                className="form-input"
                value={formData.enName}
                onChange={(e) => setFormData({ ...formData, enName: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="benefitName" className="form-label required">
                혜택 설명
              </label>
              <input
                type="text"
                id="benefitName"
                className="form-input"
                value={formData.benefitName}
                onChange={(e) => setFormData({ ...formData, benefitName: e.target.value })}
                placeholder="예: 30일 전 예약 시 20% 할인"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomId" className="form-label">
                객실 ID
              </label>
              <input
                type="text"
                id="roomId"
                className="form-input"
                value={formData.roomId}
                onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ratePlanType" className="form-label required">
                요금제 유형
              </label>
              <select
                id="ratePlanType"
                className="form-select"
                value={formData.ratePlanType}
                onChange={(e) =>
                  setFormData({ ...formData, ratePlanType: e.target.value as RatePlanType })
                }
                required
              >
                {Object.entries(RATE_PLAN_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mealPlan" className="form-label required">
                식사 포함
              </label>
              <select
                id="mealPlan"
                className="form-select"
                value={formData.mealPlan}
                onChange={(e) =>
                  setFormData({ ...formData, mealPlan: e.target.value as MealPlan })
                }
                required
              >
                {Object.entries(MEAL_PLAN_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label required">
                상태
              </label>
              <select
                id="status"
                className="form-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as RatePlanStatus })
                }
                required
              >
                {Object.entries(RATE_PLAN_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                />
                <span>활성화</span>
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-section">
          <h2 className="section-title">상세 설명</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                한글 설명
              </label>
              <textarea
                id="description"
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="enDescription" className="form-label">
                영문 설명
              </label>
              <textarea
                id="enDescription"
                className="form-textarea"
                value={formData.enDescription}
                onChange={(e) => setFormData({ ...formData, enDescription: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="form-section">
          <h2 className="section-title">요금제 설정</h2>
          <div className="settings-layout">
            <div className="settings-group">
              <h3 className="group-title">숙박 기간</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minLos" className="form-label">
                    최소 숙박 (박)
                  </label>
                  <input
                    type="number"
                    id="minLos"
                    className="form-input"
                    value={formData.minLos}
                    onChange={(e) =>
                      setFormData({ ...formData, minLos: parseInt(e.target.value) })
                    }
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxLos" className="form-label">
                    최대 숙박 (박)
                  </label>
                  <input
                    type="number"
                    id="maxLos"
                    className="form-input"
                    value={formData.maxLos}
                    onChange={(e) =>
                      setFormData({ ...formData, maxLos: parseInt(e.target.value) })
                    }
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3 className="group-title">체류 일수</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minThroughDays" className="form-label">
                    최소 체류 (일)
                  </label>
                  <input
                    type="number"
                    id="minThroughDays"
                    className="form-input"
                    value={formData.minThroughDays}
                    onChange={(e) =>
                      setFormData({ ...formData, minThroughDays: parseInt(e.target.value) })
                    }
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxThroughDays" className="form-label">
                    최대 체류 (일)
                  </label>
                  <input
                    type="number"
                    id="maxThroughDays"
                    className="form-input"
                    value={formData.maxThroughDays}
                    onChange={(e) =>
                      setFormData({ ...formData, maxThroughDays: parseInt(e.target.value) })
                    }
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3 className="group-title">사전 예약</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minAdvanceDays" className="form-label">
                    최소 사전 예약 (일)
                  </label>
                  <input
                    type="number"
                    id="minAdvanceDays"
                    className="form-input"
                    value={formData.minAdvanceDays}
                    onChange={(e) =>
                      setFormData({ ...formData, minAdvanceDays: parseInt(e.target.value) })
                    }
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxAdvanceDays" className="form-label">
                    최대 사전 예약 (일)
                  </label>
                  <input
                    type="number"
                    id="maxAdvanceDays"
                    className="form-input"
                    value={formData.maxAdvanceDays}
                    onChange={(e) =>
                      setFormData({ ...formData, maxAdvanceDays: parseInt(e.target.value) })
                    }
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3 className="group-title">재고 및 제한</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="allotment" className="form-label">
                    배정 재고
                  </label>
                  <input
                    type="number"
                    id="allotment"
                    className="form-input"
                    value={formData.allotment}
                    onChange={(e) =>
                      setFormData({ ...formData, allotment: parseInt(e.target.value) })
                    }
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.closedToArrival}
                      onChange={(e) =>
                        setFormData({ ...formData, closedToArrival: e.target.checked })
                      }
                    />
                    <span>입실 제한</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.closedToDeparture}
                      onChange={(e) =>
                        setFormData({ ...formData, closedToDeparture: e.target.checked })
                      }
                    />
                    <span>퇴실 제한</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sale Period */}
        <div className="form-section">
          <h2 className="section-title">판매 기간</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="bookingStartDate" className="form-label">
                예약 시작일
              </label>
              <input
                type="date"
                id="bookingStartDate"
                className="form-input"
                value={formData.bookingStartDate}
                onChange={(e) =>
                  setFormData({ ...formData, bookingStartDate: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookingEndDate" className="form-label">
                예약 종료일
              </label>
              <input
                type="date"
                id="bookingEndDate"
                className="form-input"
                value={formData.bookingEndDate}
                onChange={(e) => setFormData({ ...formData, bookingEndDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stayStartDate" className="form-label">
                숙박 시작일
              </label>
              <input
                type="date"
                id="stayStartDate"
                className="form-input"
                value={formData.stayStartDate}
                onChange={(e) => setFormData({ ...formData, stayStartDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stayEndDate" className="form-label">
                숙박 종료일
              </label>
              <input
                type="date"
                id="stayEndDate"
                className="form-input"
                value={formData.stayEndDate}
                onChange={(e) => setFormData({ ...formData, stayEndDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Cancellation Policies */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">취소 정책</h2>
            <button
              type="button"
              onClick={addCancellationPolicy}
              className="btn btn-secondary"
            >
              정책 추가
            </button>
          </div>

          <div className="policies-container">
            {cancellationPolicies.map((policy, policyIndex) => (
              <div key={policy.id} className="policy-card">
                <div className="policy-header">
                  <h3 className="policy-title">취소 정책 #{policyIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeCancellationPolicy(policyIndex)}
                    className="btn btn-danger-text"
                  >
                    삭제
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">정책 이름</label>
                    <input
                      type="text"
                      className="form-input"
                      value={policy.name}
                      onChange={(e) =>
                        updateCancellationPolicy(policyIndex, { name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">시작 일시</label>
                    <input
                      type="datetime-local"
                      className="form-input"
                      value={policy.startDateTime}
                      onChange={(e) =>
                        updateCancellationPolicy(policyIndex, { startDateTime: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">종료 일시</label>
                    <input
                      type="datetime-local"
                      className="form-input"
                      value={policy.endDateTime}
                      onChange={(e) =>
                        updateCancellationPolicy(policyIndex, { endDateTime: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">우선순위</label>
                    <input
                      type="number"
                      className="form-input"
                      value={policy.priority}
                      onChange={(e) =>
                        updateCancellationPolicy(policyIndex, {
                          priority: parseInt(e.target.value)
                        })
                      }
                      min="1"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">적용 요일</label>
                    <div className="days-selector">
                      {[
                        { key: 'sunday', label: '일' },
                        { key: 'monday', label: '월' },
                        { key: 'tuesday', label: '화' },
                        { key: 'wednesday', label: '수' },
                        { key: 'thursday', label: '목' },
                        { key: 'friday', label: '금' },
                        { key: 'saturday', label: '토' }
                      ].map(({ key, label }) => (
                        <label key={key} className="day-checkbox">
                          <input
                            type="checkbox"
                            checked={policy[key as keyof RatePlanCancellationPolicy] as boolean}
                            onChange={(e) =>
                              updateCancellationPolicy(policyIndex, {
                                [key]: e.target.checked
                              })
                            }
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Penalties */}
                <div className="penalties-section">
                  <div className="penalties-header">
                    <h4 className="penalties-title">위약금</h4>
                    <button
                      type="button"
                      onClick={() => addPenalty(policyIndex)}
                      className="btn btn-secondary btn-sm"
                    >
                      위약금 추가
                    </button>
                  </div>

                  {policy.penalties.map((penalty, penaltyIndex) => (
                    <div key={penalty.id} className="penalty-row">
                      <div className="form-group">
                        <label className="form-label">일수</label>
                        <input
                          type="number"
                          className="form-input"
                          value={penalty.days}
                          onChange={(e) =>
                            updatePenalty(policyIndex, penaltyIndex, {
                              days: parseInt(e.target.value)
                            })
                          }
                          min="0"
                          placeholder="일 전"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">유형</label>
                        <select
                          className="form-select"
                          value={penalty.unit}
                          onChange={(e) =>
                            updatePenalty(policyIndex, penaltyIndex, {
                              unit: e.target.value as CancellationPenaltyUnit
                            })
                          }
                        >
                          <option value="percentage">비율 (%)</option>
                          <option value="fixed">고정 금액</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">금액</label>
                        <input
                          type="number"
                          className="form-input"
                          value={penalty.amount}
                          onChange={(e) =>
                            updatePenalty(policyIndex, penaltyIndex, {
                              amount: parseFloat(e.target.value)
                            })
                          }
                          min="0"
                          step="0.01"
                        />
                      </div>

                      {penalty.unit === 'fixed' && (
                        <div className="form-group">
                          <label className="form-label">통화</label>
                          <input
                            type="text"
                            className="form-input"
                            value={penalty.currencyUnit || 'KRW'}
                            onChange={(e) =>
                              updatePenalty(policyIndex, penaltyIndex, {
                                currencyUnit: e.target.value
                              })
                            }
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removePenalty(policyIndex, penaltyIndex)}
                        className="btn btn-danger-text btn-sm"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <Link href="/rateplans" className="btn btn-secondary">
            취소
          </Link>
          <button type="submit" className="btn btn-primary">
            {isEdit ? '수정 완료' : '생성'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .container {
          padding: var(--spacing-lg);
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
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

        .form-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .form-section {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .section-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-lg) 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .form-label.required::after {
          content: ' *';
          color: var(--danger);
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          background: var(--bg-primary);
          transition: border-color 0.2s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
        }

        .form-textarea {
          resize: vertical;
          font-family: inherit;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-sm);
          color: var(--text-primary);
          cursor: pointer;
        }

        .checkbox-label input[type='checkbox'] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .settings-layout {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .settings-group {
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

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
        }

        .policies-container {
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

        .policy-title {
          font-size: var(--font-size-md);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .days-selector {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .day-checkbox {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: var(--font-size-sm);
        }

        .day-checkbox input[type='checkbox'] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .penalties-section {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border-color);
        }

        .penalties-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .penalties-title {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .penalty-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr auto;
          gap: var(--spacing-sm);
          align-items: end;
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-sm);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          padding: var(--spacing-xl);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          position: sticky;
          bottom: var(--spacing-lg);
        }

        .btn {
          padding: var(--spacing-sm) var(--spacing-xl);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        .btn-secondary {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--bg-secondary);
        }

        .btn-danger-text {
          color: var(--danger);
          background: transparent;
        }

        .btn-danger-text:hover {
          background: var(--danger-bg);
        }

        .btn-sm {
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-size-xs);
        }

        @media (max-width: 768px) {
          .form-grid,
          .form-row,
          .penalty-row {
            grid-template-columns: 1fr;
          }

          .penalty-row {
            gap: var(--spacing-md);
          }
        }
      `}</style>
    </div>
  )
}