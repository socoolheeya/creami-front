import axios, { AxiosError, AxiosRequestConfig } from 'axios'

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9001'

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 있으면 헤더에 추가 (나중에 인증 구현 시 사용)
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // 에러 응답 처리
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized - 401')
    }
    return Promise.reject(error)
  }
)

// API 에러 타입
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// HTTP Methods
export const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.get<T>(endpoint, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.status || 500,
          error.response?.statusText || 'Error',
          error.response?.data?.message || error.message
        )
      }
      throw error
    }
  },

  post: async <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.post<T>(endpoint, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.status || 500,
          error.response?.statusText || 'Error',
          error.response?.data?.message || error.message
        )
      }
      throw error
    }
  },

  put: async <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.put<T>(endpoint, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.status || 500,
          error.response?.statusText || 'Error',
          error.response?.data?.message || error.message
        )
      }
      throw error
    }
  },

  patch: async <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.patch<T>(endpoint, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.status || 500,
          error.response?.statusText || 'Error',
          error.response?.data?.message || error.message
        )
      }
      throw error
    }
  },

  delete: async <T>(endpoint: string, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.delete<T>(endpoint, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          error.response?.status || 500,
          error.response?.statusText || 'Error',
          error.response?.data?.message || error.message
        )
      }
      throw error
    }
  },
}
