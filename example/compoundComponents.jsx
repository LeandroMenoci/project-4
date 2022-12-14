/*eslint-disable */

// Compound Components

import { Children, cloneElement, createContext, useContext, useState } from "react"


const s = {
  style: {
    fontSize: '60px',
    color: 'darkblue'
  }
}

const TurnOnOffContext = createContext()

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false)
  const onTurn = () => setIsOn(s => !s)

  return <TurnOnOffContext.Provider value={{ isOn, onTurn }}>{children}</TurnOnOffContext.Provider>
}

const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext)
  return isOn ? children : null
}
const TurnedOff = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext)
  return isOn ? null : children
}
const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext)

  return <button onClick={onTurn} {...props}>Turn {isOn ? 'OFF' : 'ON'} </button>
}

const P = ({ children }) => <p {...s}>{children}</p>

export const Home = () => {
  return (
    <TurnOnOff>
      <div>
        <p>OI</p>
        <TurnedOn><P>Aqui as coisas que vão acontecer quando estiver On</P></TurnedOn>

        <TurnedOff><P>Aqui vem as coisas do OFF</P></TurnedOff>
        <TurnButton {...s} />
      </div>
    </TurnOnOff>
  )
}
