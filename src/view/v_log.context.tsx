import React, { ReactNode, useContext, useRef, useState } from 'react'
import CObj from '../model/m_obj'

// типы логируемых данных
export const enum LogTypes {
  TYPE_ACTIONS,
  TYPE_LOOT,
  TYPE_UNLOCK,
  TYPE_BATTLE,
}
// структура логируемых данных
export interface LogData {
  type: LogTypes
  when: number
  obj: CObj | undefined
  str: string
  val: number
}
// тип передаваемого контекста
interface propsLogContext {
  arr: React.MutableRefObject<LogData[]> | undefined
  state: number
  toLog: (ld: LogData) => void
}
// начальное значение, если провайдера не будет
const stub: propsLogContext = {
  arr: undefined,
  state: Date.now(),
  toLog: (ld: LogData) => {},
}
// создаем контекст
const LogContext = React.createContext(stub)
export const useLog = () => {
  return useContext(LogContext)
}

export default function LogProvider(props: { children: ReactNode }) {
  const arrLogData = useRef(new Array<LogData>())
  // как статус идет миллисекунда
  const [arrLogState, setArrLogState] = useState(Date.now())
  const toLog = (ld: LogData) => {
    arrLogData.current.unshift(ld)
    if (arrLogData.current.length > 100) arrLogData.current.splice(0, 10)

    setArrLogState(ld.when)
  }

  return (
    <LogContext.Provider
      value={{ state: arrLogState, arr: arrLogData, toLog: toLog }}
    >
      {props.children}
    </LogContext.Provider>
  )
}
