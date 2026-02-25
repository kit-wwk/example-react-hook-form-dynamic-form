import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { ErrorResponse } from '@/api/generated/models'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const apiError = error.response?.data
    if (apiError?.message) {
      console.error(`API Error [${apiError.status}]: ${apiError.message}`, apiError.details)
    }
    return Promise.reject(error)
  },
)

/** Orval mutator — wraps all generated API calls through the custom axios instance */
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const promise = axiosInstance(config).then(({ data }) => data as T)
  return promise
}

export default customInstance
