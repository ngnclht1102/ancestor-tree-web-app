import { useState, useEffect } from 'react'

export default function usePromise(
  promise: any,
  promiseParams?: any,
  outputModified?: (res: any) => any
) {
  const [isWorking, setIsWorking] = useState(false)
  const [error, setError] = useState(null)

  const [data, setData] = useState(null)

  async function exec(inContextParams?: any) {
    if (isWorking) return null
    let err = null
    let responseData
    setIsWorking(true)
    setError(err)
    try {
      const raw = await promise(inContextParams || promiseParams)
      if (outputModified) {
        responseData = outputModified(raw)
      } else responseData = raw
      setData(responseData)
    } catch (error) {
      err = error
      setError(error)
    }
    setIsWorking(false)

    return {
      error: err,
      data: responseData
    }
  }
  async function resetState() {
    setIsWorking(false)
    setError(null)
    setData(null)
  }

  return {
    isWorking,
    error,
    data,
    exec,
    resetState
  }
}
