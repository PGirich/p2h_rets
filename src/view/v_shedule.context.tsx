import React, { ReactNode, useContext, useReducer } from 'react'
import { oList } from '../model/m_data'
import CAction from '../model/m_action'

// тип состояния
interface IStateSheduleContext {
  shedule: Array<CAction>
  focus: number
  currentRestAction: CAction
  maxTasks: number
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
  return useContext(SheduleContext)
}
// действия диспетчера
const enum ActionTypes {
  SHEDULE_SETFOCUS = 'setFocus',
  SHEDULE_SETREST = 'setRest',
  SHEDULE_SETMAXTASKS = 'setFocusMaxTasks',
  SHEDULE_SETSHEDULE = 'setShedule',
}
interface IActionN {
  type: ActionTypes.SHEDULE_SETFOCUS | ActionTypes.SHEDULE_SETMAXTASKS
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
    currentRestAction: oList.get('action_live')! as CAction,
    maxTasks: 1,
  })
  console.log(oList.get('action_live'))
  // actions
  const setFocus = (value: number) =>
    dispatch({ type: ActionTypes.SHEDULE_SETFOCUS, value })
  const setRest = (obj: CAction) =>
    dispatch({ type: ActionTypes.SHEDULE_SETREST, obj })
  const setMaxTasks = (value: number) =>
    dispatch({ type: ActionTypes.SHEDULE_SETMAXTASKS, value })
  const setShedule = (arrObj: Array<CAction>) =>
    dispatch({ type: ActionTypes.SHEDULE_SETSHEDULE, arrObj })

  // element
  return (
    <SheduleContext.Provider
      value={{
        shedule: state.shedule,
        focus: state.focus,
        currentRestAction: state.currentRestAction,
        maxTasks: state.maxTasks,
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
