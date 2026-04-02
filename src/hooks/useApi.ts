/**
 * useApi Hook - Custom hook for data fetching with loading and error states
 */

'use client'

import { useState, useCallback } from 'react'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useApi<T>(fetchFn: () => Promise<T>, options: UseApiOptions<T> = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const data = await fetchFn()
      setState({ data, loading: false, error: null })
      options.onSuccess?.(data)
      return data
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState(prev => ({ ...prev, loading: false, error: err }))
      options.onError?.(err)
      throw err
    }
  }, [fetchFn, options])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
