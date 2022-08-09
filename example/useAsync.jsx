/*eslint-disable */

import { useCallback, useEffect, useState } from "react"

const useAsync = (asyncFunction, shouldRun) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  const run = useCallback(() => {
    console.log('EFFECT', new Date().toLocaleString())
    setResult(null)
    setError(null)
    setStatus('pending')

    return asyncFunction()
      .then(res => {
        setResult(res)
        setStatus('settled')
      })
      .catch(error => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  useEffect(() => {
    if (shouldRun) {
      run()
    }
  }, [run, shouldRun])

  return [run, result, error, status]
}

const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await data.json()
  return json
}

export const Home = () => {
  const [posts, setPosts] = useState(null)
  const [reFetchData, result, error, status] = useAsync(fetchData, true)

  if (status === 'idle') {
    return <pre>Nada executando</pre>
  }
  if (status === 'pending') {
    return <pre>Loading...</pre>
  }
  if (status === 'error') {
    return <pre>Erro</pre>
  }
  if (status === 'settled') {
    return <pre>{JSON.stringify(result, null, 2)}</pre>
  }

  return 'deu errado'
}
