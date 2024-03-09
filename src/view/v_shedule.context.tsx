import React, { ReactNode, useContext, useEffect, useReducer } from 'react'
import { actListApply, oList } from '../model/m_data'
import CAction from '../model/m_action'
import {
  ACTION_LIVE,
  ACTION_REST,
  STAT_AGE,
  STAT_AGE_REBORN,
} from '../model/m_init'
import CStat from '../model/m_stat'

// тип состояния
interface IStateSheduleContext {
  shedule: Array<CAction>
  focus: number
  currentRestAction: CAction
  maxTasks: number
  currentTime: number
}
// тип передаваемого контекста
interface IPropsSheduleContext extends IStateSheduleContext {
  setFocus: (value: number) => void
  setRest: (obj: CAction) => void
  setMaxTasks: (value: number) => void
  setShedule: (arrObj: Array<CAction>) => void
}
// создаем контекст
const SheduleContext = React.createContext({} as IPropsSheduleContext)
export const useShedule = () => {
  const context = React.useContext(SheduleContext)
  if (!context) throw new Error('Use Shedule context within provider!')
  return context
}
// действия диспетчера
const enum ActionTypes {
  SHEDULE_SETFOCUS = 'setFocus',
  SHEDULE_SETREST = 'setRest',
  SHEDULE_SETMAXTASKS = 'setFocusMaxTasks',
  SHEDULE_SETSHEDULE = 'setShedule',
  SHEDULE_SETCURRENTTIME = 'setCurrentTime',
}
interface IActionN {
  type:
    | ActionTypes.SHEDULE_SETFOCUS
    | ActionTypes.SHEDULE_SETMAXTASKS
    | ActionTypes.SHEDULE_SETCURRENTTIME
  value: number
}
interface IActionO {
  type: ActionTypes.SHEDULE_SETREST
  obj: CAction
}
interface IActionAO {
  type: ActionTypes.SHEDULE_SETSHEDULE
  arrObj: Array<CAction>
}
type IAction = IActionN | IActionO | IActionAO

// обработка
const reducer = (state: IStateSheduleContext, action: IAction) => {
  switch (action.type) {
    case ActionTypes.SHEDULE_SETFOCUS:
      return { ...state, focus: action.value }
    case ActionTypes.SHEDULE_SETREST:
      return { ...state, currentRestAction: action.obj }
    case ActionTypes.SHEDULE_SETMAXTASKS:
      return { ...state, maxTasks: action.value }
    case ActionTypes.SHEDULE_SETSHEDULE:
      return { ...state, shedule: action.arrObj }
    case ActionTypes.SHEDULE_SETCURRENTTIME:
      const ct = state.currentTime + action.value
      ;(oList.get(STAT_AGE) as unknown as CStat).count = ct
      return { ...state, currentTime: state.currentTime + action.value }
    default:
      break
  }
  return state
}

// провайдер
export default function SheduleProvider(props: { children: ReactNode }) {
  // initial value
  const [state, dispatch] = useReducer(reducer, {
    shedule: new Array<CAction>(),
    focus: 0,
    currentRestAction: oList.get(ACTION_REST)! as CAction,
    maxTasks: 1,
    currentTime: STAT_AGE_REBORN,
  })
  // actions
  const setFocus = (value: number) =>
    dispatch({ type: ActionTypes.SHEDULE_SETFOCUS, value })
  const setRest = (obj: CAction) =>
    dispatch({ type: ActionTypes.SHEDULE_SETREST, obj })
  const setMaxTasks = (value: number) =>
    dispatch({ type: ActionTypes.SHEDULE_SETMAXTASKS, value })
  const setShedule = (arrObj: Array<CAction>) =>
    dispatch({ type: ActionTypes.SHEDULE_SETSHEDULE, arrObj })
  const setCurrentTime = (value: number) =>
    dispatch({ type: ActionTypes.SHEDULE_SETCURRENTTIME, value })

  // process shedule
  useEffect(() => {
    const processTimer = setInterval(() => {
      actListApply()
      setCurrentTime(1)
    }, 1000)
    return () => clearInterval(processTimer)
  })

  // element
  return (
    <SheduleContext.Provider
      value={{
        shedule: state.shedule,
        focus: state.focus,
        currentRestAction: state.currentRestAction,
        maxTasks: state.maxTasks,
        currentTime: state.currentTime,
        setFocus,
        setRest,
        setMaxTasks,
        setShedule,
      }}
    >
      {props.children}
    </SheduleContext.Provider>
  )
}
