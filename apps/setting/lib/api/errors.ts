export const API_UNAVAILABLE_ERROR = 'SUPPLIER_API_UNAVAILABLE'

export function getDisplayApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (!(error instanceof Error)) {
    return fallbackMessage
  }

  if (error.message === API_UNAVAILABLE_ERROR) {
    return fallbackMessage
  }

  return error.message || fallbackMessage
}
