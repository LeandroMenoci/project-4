/*eslint-disable */

import { useEffect, useRef, useState } from "react"

export function Home() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4])
  const divRef = useRef()

  useEffect(() => {
    const now = Date.now()
    while (Date.now() < now + 1110)
      divRef.current.scrollTop = divRef.current.scrollHeight
  })

  function handleClick() {
    setCounted((c) => [...c, +c.slice(-1) + 1])
  }

  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <div ref={divRef} style={{ height: '100px', width: '100px', overflowY: 'scroll' }}>
        {counted.map(c => {
          return <p key={`c-${c}`}>{c}</p>
        })}
      </div>
    </>
  )
}
