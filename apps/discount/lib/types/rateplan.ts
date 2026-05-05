export interface RatePlan {
  id: string
  name: string
  accommodationId: string
  accommodationName: string
  roomId?: string
  roomName?: string
  description?: string
  isActive: boolean
}

export interface DiscountRatePlanMapping {
  ratePlanId: string
  discountIds: string[]
}
