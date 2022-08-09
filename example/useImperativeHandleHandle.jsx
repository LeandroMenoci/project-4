/*eslint-disable */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

export function Home() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4])
  const divRef = useRef()

  useEffect(() => {
    const now = Date.now()
    while (Date.now() < now + 110)
      divRef.current.ref.scrollTop = divRef.current.ref.scrollHeight
  })

  function handleClick() {
    setCounted((c) => [...c, +c.slice(-1) + 1])
    divRef.current.handleClick()
  }

  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef} />
    </>
  )
}

export const DisplayCounted = forwardRef(function DisplayCounted({ counted }, divRef) {

  const [rand, setRand] = useState('0.39')
  const ref = useRef()

  const handleClick = () => {
    setRand(Math.random().toFixed(2))
  }

  useImperativeHandle(divRef, () => ({
    handleClick,
    ref: ref.current
  }))
  return (
    <div ref={ref} style={{ height: '200px', width: '200px', overflowY: 'scroll' }}>
      {counted.map(c => {
        return <p key={`c-${c}`} onClick={handleClick}>{c} +++ {rand}</p>
      })}
    </div>
  )
})
