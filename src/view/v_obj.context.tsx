import React, { ReactNode, useContext, useReducer } from 'react'
import { oList } from '../model/m_data'
import CAction from '../model/m_action'
import CPlace from '../model/m_place'
import CObj from '../model/m_obj'
import { PLACE_VILLAGE } from '../model/m_init'
import COutfit from '../model/m_outfit'

// тип состояния
interface IStateObjContext {
  currentPlace: CPlace
}
// тип передаваемого контекста
interface IPropsObjContext extends IStateObjContext {
  actionDispatch: (obj: CObj, action: ObjActionTypes) => void
}
// создаем контекст
const ObjContext = React.createContext({} as IPropsObjContext)
export const useObj = () => {
  const context = React.useContext(ObjContext)
  if (!context) throw new Error('Use Obj context within provider!')
  return context
}
// действия диспетчера
export const enum ObjActionTypes {
  ACTION_TRAVEL = 'travel',
  ACTION_PERFORM = 'perform',
  ACTION_BUY = 'buy',
  ACTION_SELL = 'sell',
  ACTION_UNLOCK = 'unlock',
  ACTION_EQUIP = 'equip',
}
interface IObjAction {
  type: ObjActionTypes
  obj: CObj
}

// обработка
const reducer = (state: IStateObjContext, action: IObjAction) => {
  const obj = action.obj
  switch (action.type) {
    case ObjActionTypes.ACTION_TRAVEL:
      ;(obj as unknown as CPlace).travel()
      return { ...state, currentPlace: action.obj as unknown as CPlace }
    case ObjActionTypes.ACTION_PERFORM:
      ;(obj as unknown as CAction).begin()
      //;(obj as unknown as CAction).actionProgress += 1
      break
    case ObjActionTypes.ACTION_BUY:
      obj.buy(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_SELL:
      obj.sell(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_UNLOCK:
      obj.unlock(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_EQUIP:
      ;(obj as unknown as COutfit).equip()
      break
    default:
      break
  }
  return state
}

// провайдер
export default function ObjProvider(props: { children: ReactNode }) {
  // initial value
  const [state, dispatch] = useReducer(reducer, {
    currentPlace: oList.get(PLACE_VILLAGE) as CPlace,
  })
  //
  const actionDispatch = (obj: CObj, actn: ObjActionTypes) => {
    dispatch({ type: actn, obj })
  }
  // element
  return (
    <ObjContext.Provider
      value={{ currentPlace: state.currentPlace, actionDispatch }}
    >
      {props.children}
    </ObjContext.Provider>
  )
}
